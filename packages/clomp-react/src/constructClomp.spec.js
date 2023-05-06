import { render, screen } from "@testing-library/react";
import PropTypes from "prop-types";
import React from "react";
import clomp from "./constructClomp";

test("Can use DOM element constructors", () => {
  expect(clomp.div``).toBeTruthy();
  expect(clomp.span``).toBeTruthy();
  expect(clomp.a``).toBeTruthy();
  expect(clomp.abbr``).toBeTruthy();
  expect(clomp.img``).toBeTruthy();
});

test("Can forward a ref to the child component", () => {
  const Container = clomp.div`
    cursor-pointer
  `;

  const ref = React.createRef();
  render(<Container ref={ref} />);
  expect(ref.current).toBeTruthy();
});

test("Can use a pre-existing Component", () => {
  const Listing = ({ name, ...props }) => (
    <li title="A listing" {...props}>
      {name}
    </li>
  );

  Listing.propTypes = {
    name: PropTypes.string,
  };

  const StyledListing = clomp(Listing)`
    cursor-pointer
    pr-4
    flex

    sm:
      pr-0
      flex-col
  `;

  render(<StyledListing name="Flower" />);
  expect(screen.getByTitle("A listing").className).toEqual(
    "cursor-pointer pr-4 flex sm:pr-0 sm:flex-col",
  );

  expect(screen.getByTitle("A listing").outerHTML).toEqual(
    '<li title="A listing" class="cursor-pointer pr-4 flex sm:pr-0 sm:flex-col">Flower</li>',
  );
});

test("Can see all proper props on child.", () => {
  const Element = clomp.div`
    cursor-pointer
    pr-4
    flex

    sm:
      pr-0
      flex-col
      w-1/2
  `;

  render(<Element title="An element" />);

  expect(screen.getByTitle("An element").className).toEqual(
    "cursor-pointer pr-4 flex sm:pr-0 sm:flex-col sm:w-1/2",
  );
});

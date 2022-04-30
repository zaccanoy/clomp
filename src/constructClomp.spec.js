/**
 * @jest-environment jsdom
 */

import React from "react";
import PropTypes from "prop-types";
import { render, screen } from "@testing-library/react";
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
  const el = <Container ref={ref} />;
  expect(el.ref).toBeTruthy();
});

test("Class names are passed to and rendered from a pre-existing component", () => {
  const Listing = (props) => <li className={props.className}>{props.name}</li>;

  Listing.propTypes = {
    name: PropTypes.string,
    className: PropTypes.string,
  };

  const StyledListing = clomp(Listing)`
    cursor-pointer
    pr-4
    flex

    sm:
      pr-0
      flex-col
  `;

  const name = "Flower";

  render(
    <ul>
      <StyledListing name={name} />
    </ul>,
  );

  expect(screen.getByText(name).className).toEqual(
    "cursor-pointer pr-4 flex sm:pr-0 sm:flex-col",
  );
});

test("Can see all proper class names on rendered element.", () => {
  const Element = clomp.h1`
    cursor-pointer
    pr-4
    flex

    sm:
      pr-0
      flex-col
      w-1/2
  `;

  render(<Element />);

  expect(screen.getByRole("heading").className).toEqual(
    "cursor-pointer pr-4 flex sm:pr-0 sm:flex-col sm:w-1/2",
  );
});

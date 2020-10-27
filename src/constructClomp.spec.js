import React from "react";
import PropTypes from "prop-types";
import { mount } from "enzyme";
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

test("Can use a pre-existing Component", () => {
  const Listing = (props) => <li>{props.name}</li>;

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

  const wrapper = mount(<StyledListing name="Flower" />);

  expect(wrapper.find(Listing).prop("className")).toEqual(
    "cursor-pointer pr-4 flex sm:pr-0 sm:flex-col",
  );

  expect(wrapper.find(Listing).childAt(0).html()).toEqual("<li>Flower</li>");
});

test("Can see all proper props on child.", () => {
  const Element = clomp.div`
    cursor-pointer
    pr-4
    flex

    sm:
      pr-0
      flex-col
  `;

  const wrapper = mount(<Element />);

  expect(wrapper.find("div").prop("className")).toEqual(
    "cursor-pointer pr-4 flex sm:pr-0 sm:flex-col",
  );
});

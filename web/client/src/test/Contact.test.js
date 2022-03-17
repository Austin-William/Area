import React from "react";
import renderer from "react-test-renderer";
import Contact from "../pages/Contact";

test("Pages : Contact renders correctly", () => {
  const tree = renderer.create(<Contact />).toJSON();
  expect(tree).toMatchSnapshot();
});


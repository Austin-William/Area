import React from "react";
import renderer from "react-test-renderer";
import About from "../pages/About";

test("Pages : About renders correctly", () => {
  const tree = renderer.create(<About />).toJSON();
  expect(tree).toMatchSnapshot();
});


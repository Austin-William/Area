import React from "react";
import renderer from "react-test-renderer";
import Register from "../pages/Register";

test("Pages : Register renders correctly", () => {
  const tree = renderer.create(<Register />).toJSON();
  expect(tree).toMatchSnapshot();
});


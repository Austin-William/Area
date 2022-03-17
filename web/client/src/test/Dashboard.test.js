import React from "react";
import renderer from "react-test-renderer";
import Dashboard from "../pages/Dashboard";

test("Pages : Dashboard renders correctly", () => {
  const tree = renderer.create(<Dashboard />).toJSON();
  expect(tree).toMatchSnapshot();
});


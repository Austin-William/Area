import React from "react";
import renderer from "react-test-renderer";
import Error from "../pages/Error";

test("Pages : Error renders correctly", () => {
  const tree = renderer.create(<Error />).toJSON();
  expect(tree).toMatchSnapshot();
});
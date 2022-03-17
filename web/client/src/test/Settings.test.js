import React from "react";
import renderer from "react-test-renderer";
import Settings from "../pages/Settings";

test("Pages : Settings renders correctly", () => {
  const tree = renderer.create(<Settings />).toJSON();
  expect(tree).toMatchSnapshot();
});


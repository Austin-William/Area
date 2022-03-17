import React from "react";
import renderer from "react-test-renderer";
import Help from "../pages/Help";

test("Pages : Help renders correctly", () => {
  const tree = renderer.create(<Help />).toJSON();
  expect(tree).toMatchSnapshot();
});


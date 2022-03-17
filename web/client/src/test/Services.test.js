import React from "react";
import renderer from "react-test-renderer";
import Services from "../pages/Services";

test("Pages : Services renders correctly", () => {
  const tree = renderer.create(<Services />).toJSON();
  expect(tree).toMatchSnapshot();
});


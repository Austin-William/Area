import React from "react";
import renderer from "react-test-renderer";
import Url from "../pages/Url";

test("Pages : Url renders correctly", () => {
  const tree = renderer.create(<Url />).toJSON();
  expect(tree).toMatchSnapshot();
});


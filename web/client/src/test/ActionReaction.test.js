import React from "react";
import renderer from "react-test-renderer";
import ActionsReactions from "../components/ActionsReactions";

test("Components : ActionsReactions renders correctly", () => {
  const tree = renderer.create(<ActionsReactions />).toJSON();
  expect(tree).toMatchSnapshot();
});


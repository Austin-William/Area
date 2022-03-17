import React from "react";
import renderer from "react-test-renderer";
import Widget from "../components/Widget";

test("Components : Widget renders correctly", () => {
  const tree = renderer.create(<Widget />).toJSON();
  expect(tree).toMatchSnapshot();
});

test("Components : Widget renders correctly", () => {
  const tree = renderer.create(<Widget index={3} />).toJSON();
  expect(tree).toMatchSnapshot();
});

test("Components : Widget renders correctly", () => {
  var userData = {};
  const tree = renderer.create(<Widget currentUserData={userData} />).toJSON();
  expect(tree).toMatchSnapshot();
});

test("Components : Widget renders correctly", () => {
  const tree = renderer.create(<Widget title="Widget title" />).toJSON();
  expect(tree).toMatchSnapshot();
});
import React from "react";
import renderer from "react-test-renderer";
import Notifications from "../components/Notifications";

test("Components : Notifications renders correctly", () => {
  const tree = renderer.create(<Notifications />).toJSON();
  expect(tree).toMatchSnapshot();
});

test("Components : Notifications renders correctly", () => {
  var userData = {};
  const tree = renderer.create(<Notifications currentUserData={userData} />).toJSON();
  expect(tree).toMatchSnapshot();
});

test("Components : Notifications renders correctly", () => {
  const tree = renderer.create(<Notifications content="Random text" />).toJSON();
  expect(tree).toMatchSnapshot();
});

test("Components : Notifications renders correctly", () => {
  const tree = renderer.create(<Notifications index={2} />).toJSON();
  expect(tree).toMatchSnapshot();
});

test("Components : Notifications renders correctly", () => {
  const tree = renderer.create(<Notifications id="gjdsbfghsdihvsdv" />).toJSON();
  expect(tree).toMatchSnapshot();
});

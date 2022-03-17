import React from "react";
import renderer from "react-test-renderer";
import Api from "../components/Api";

test("Components : Api renders correctly", () => {
  const tree = renderer.create(<Api />).toJSON();
  expect(tree).toMatchSnapshot();
});

test("Components : Api renders correctly", () => {
  const tree = renderer.create(<Api link="https://areactionback.herokuapp.com/" />).toJSON();
  expect(tree).toMatchSnapshot();
});

test("Components : Api renders correctly", () => {
  const tree = renderer.create(<Api name="test" />).toJSON();
  expect(tree).toMatchSnapshot();
});

test("Components : Api renders correctly", () => {
  const tree = renderer.create(<Api access_token="access_token_random" />).toJSON();
  expect(tree).toMatchSnapshot();
});

test("Components : Api renders correctly", () => {
  const tree = renderer.create(<Api index={5} />).toJSON();
  expect(tree).toMatchSnapshot();
});
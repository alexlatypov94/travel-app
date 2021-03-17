import React, { ReactElement } from "react";
import { shallow, ShallowWrapper } from "enzyme";
import noop from "lodash/noop";
import { Header } from "./Header";

describe("Component Header: ", () => {
  let component: ShallowWrapper<ReactElement>;

  it("should render component", () => {
    component = shallow(<Header handleClick={() => noop} />);
    expect(component.exists()).toBe(true);
  });

  it("should correctly option", () => {
    const res = (component = shallow(<Header handleClick={() => noop} />));
    expect(component.find("option").exists()).toBe(true);
  });
});

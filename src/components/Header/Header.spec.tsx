import React, { ReactElement } from "react";
import { shallow, ShallowWrapper } from "enzyme";

import { Header } from "./Header";

describe("Components.Header.Header: ", () => {
  let component: ShallowWrapper<ReactElement>;

  it("should render component", () => {
    component = shallow(<Header title="" />);
    expect(component.exists()).toBe(true);
  });

  it("should display title", () => {
    const title: string = "Hello Words";
    component = shallow(<Header title={title} />);
    expect(component.text()).toEqual(title);
  });
});

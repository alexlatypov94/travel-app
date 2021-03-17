import React, { ReactElement } from "react";
import { shallow, ShallowWrapper } from "enzyme";
import { CountryPage } from './CountryPage';

import noop from "lodash/noop";

describe('CountryPage Component: ',() => {
  let component: ShallowWrapper<ReactElement>;

  it("should check output", () => {
    component = shallow(<CountryPage/>);
    expect(component.is('aside-wrapper')).toBeFalsy();
  });

  it("should correctly render", () => {
    component = shallow(<CountryPage/>);
    expect(component).toMatchSnapshot();
  });

  it("should render component", () => {
    component = shallow(<CountryPage handleClick={() => noop} />);
    expect(component.exists()).toBe(true);
  });

});

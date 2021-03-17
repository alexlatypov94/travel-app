import React, { ReactElement } from "react";
import { shallow, ShallowWrapper } from "enzyme";
import { CountryVideo } from './CountryVideo';

describe('Video Component:',() => {
  let component: ShallowWrapper<ReactElement>;

  it("should div component", () => {
    component = shallow(<CountryVideo/>);
    expect(component.find('div')).toBeTruthy();
  });

  it("should render component", () => {
    component = shallow(<CountryVideo/>);
    expect(component).toMatchSnapshot();
  });

  it("should correctly props", () => {
    component = shallow(<CountryVideo/>);
    expect(component.props()).toBeDefined();
  });

});

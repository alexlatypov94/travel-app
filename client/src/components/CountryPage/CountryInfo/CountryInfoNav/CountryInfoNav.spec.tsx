
import React, { ReactElement } from "react";
import { shallow, ShallowWrapper } from "enzyme";
import { CountryInfoNav } from './CountryInfoNav';

describe('Nav Components:',() => {
  let component: ShallowWrapper<ReactElement>;

  it("should render component", () => {
    component = shallow(<CountryInfoNav title=""/>);
    expect(component.exists()).toBe(true);
  });

  it("should title", () => {
    const title: string = "";
    component = shallow(<CountryInfoNav title={title}/>);
    expect(component.text()).toEqual(title);
  });

  it("should correctly render", () => {
    component = shallow(<CountryInfoNav/>);
    expect(component).toMatchSnapshot();
  });

});

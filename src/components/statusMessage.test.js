import React from 'react';
import { shallow } from 'enzyme';
import StatusMessage from './statusMessage';

it('Renders without crashing', () => {
    shallow(<StatusMessage />);
});

it('Renders supplied text', () => {
    const wrapper = shallow(<StatusMessage body={'test'}/>);
    expect(wrapper.find('p').text()).toEqual('test');
});
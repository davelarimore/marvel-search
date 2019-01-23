import React from 'react';
import { shallow, mount } from 'enzyme';
import SearchForm from './searchForm';

it('Renders without crashing', () => {
    shallow(<SearchForm />);
});

it('Renders supplied text', () => {
    const wrapper = mount(<SearchForm searchString={'test'} />);
    expect(wrapper.find('input').getDOMNode().value).toEqual('test');
});

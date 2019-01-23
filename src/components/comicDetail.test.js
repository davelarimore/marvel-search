import React from 'react';
import { shallow, mount } from 'enzyme';
import ComicDetail from './comicDetail';

const testData = {
    title: 'test title',
    description: '',
    pageCount: '',
    prices: [{price: '199'}],
    thumbnail: {path: '', extension: ''},
    upc: ''
};

it('Renders without crashing', () => {
    shallow(<ComicDetail comicData={testData} />);
});

it('Renders the comic title', () => {
    const wrapper = shallow(<ComicDetail comicData={testData} />);
    expect(wrapper.find('p.comicDetailTitle').text()).toEqual('test title');
});

it('Correctly renders non-float prices', () => {
    const wrapper = shallow(<ComicDetail comicData={testData} />);
    expect(wrapper.find('p.comicDetailText').text()).toEqual('Price: 1.99');
});
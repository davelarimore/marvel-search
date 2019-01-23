import React from 'react';
import { shallow, mount } from 'enzyme';
import ResultsList from './resultsList';

const testData = [{
    title: 'test title',
    id: 123,
    thumbnail: {
        path: 'testPath',
        extension: 'jpg',
    }
}];

it('Renders without crashing', () => {
    shallow(<ResultsList searchResults={testData}/>);
});

it('Renders a thumbnail', () => {    
    const wrapper = shallow(<ResultsList searchResults={testData}/>);
    expect(wrapper.find('div').first().hasClass('thumbnailContainer')).toEqual(true);
});
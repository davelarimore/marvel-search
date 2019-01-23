import React from 'react';
import { shallow } from 'enzyme';
import Loading from './loading';

it('Renders without crashing', () => {
    shallow(<Loading />);
});
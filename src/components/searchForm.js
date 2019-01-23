import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { searchComics } from '../api';
import './searchForm.css';

export default class SearchForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.props.onSearchChange(event.target.value);
    }

    handleSubmit(event) {
        this.props.toggleLoading(true);
        event.preventDefault();
        searchComics(this.props.searchString)
            .then((response) => {
                this.props.onResultsChange(response);
                this.props.toggleLoading(false);;
            })
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit} inline>
                <FormGroup className='customFormGroup'>
                    <Label for='searchString' hidden>Search:</Label>
                    <Input
                    type='text'
                    value={this.props.searchString}
                    onChange={this.handleChange}
                    name='searchString'
                    id='searchString'
                    placeholder='Enter comic name'
                    />
                </FormGroup>
                {' '}
                <Button>Submit</Button>
            </Form>
        );
    }
}

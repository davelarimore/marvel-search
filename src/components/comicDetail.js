import React from 'react';
import { Button, Container, Row, Col } from 'reactstrap';
import './comicDetail.css';

export default class ComicDetail extends React.Component {
    constructor(props) {
        super(props);
        this.handleBack = this.handleBack.bind(this);
    }

    handleBack() {
        this.props.onBack(false);
    }

    render() {
        const { comicData } = this.props;
        const description = comicData.description !== '';
        const pageCount = comicData.pageCount !== '';
        const price = comicData.prices[0].price !== '';
        const upc = comicData.upc !== '';
        let descriptionText, pageCountText, priceText, upcText;

        if (description) {
            descriptionText = <p className="comicDetailText">{comicData.description}</p>;
        }

        if (pageCount) {
            pageCountText = <p className="comicDetailText">Pages: {comicData.pageCount}</p>;
        }

        if (price) {
            if (comicData.prices[0].price % 1 !== 0) {
                priceText = <p className="comicDetailText">Price: {comicData.prices[0].price}</p>;
            } else {
                const normalizedPrice = (comicData.prices[0].price / 100).toFixed(2);
                priceText = <p className="comicDetailText">Price: {normalizedPrice}</p>;
            }
        }

        if(upc) {
            upcText = <p className="comicDetailText">UPC: {comicData.upc}</p>;
        }
 
        return (
            <Container>
                <Row>
                    <Col xs="4">
                        <img
                        className='thumbnailImg'
                        alt={comicData.title}
                        src={comicData.thumbnail.path + '/portrait_uncanny.' + comicData.thumbnail.extension}
                        />
                    </Col>
                    <Col xs="8">
                        <p className="comicDetailTitle">{comicData.title}</p>
                        {descriptionText}
                        {pageCountText}
                        {priceText}
                        {upcText}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button onClick={this.handleBack}>Back to results</Button>
                    </Col>
                </Row>
            </Container>
        );
    }
}
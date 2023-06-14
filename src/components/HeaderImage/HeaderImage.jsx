import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

import './headerImage.css';

import coverPhoto from '../../assests/design2.jpg'

const HeaderImage = () => {
  return (
    <div className="cover">
      <Container>
        <Row>
          <Col md={6}>
            <div className="cover-text">
              <h1>Cover Title</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                eget felis vel augue porttitor ultrices.
              </p>
              <Button variant="primary">Learn more</Button>
            </div>
          </Col>
          <Col md={6}>
            <div className="cover-image">
              <img
                src={coverPhoto}
                alt="Cover Image"
              />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HeaderImage;

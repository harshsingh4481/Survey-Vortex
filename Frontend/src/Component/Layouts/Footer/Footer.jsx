import React from 'react'

import { Container, Row, Col } from 'react-bootstrap';

function Footer() {
  return (
    <div>
 <footer className="py-5 bg-light">
      <Container>
        <Row>
        
          <Col xs={12} md={4}>
            <h5 className="text-uppercase fw-bold mb-4">
              E Vote
            </h5>
            <p>
              E Vote is a web application that allows users to vote for their favorite candidates in an election. The application is designed to be easy to use.
            </p>
          </Col>
          <Col xs={12} md={4}>
            <h5 className="text-uppercase fw-bold mb-4">
              feedback
            </h5>
            <ul className="list-unstyled">
              <li>
                <a href="#!" className="text-decoration-none text-dark">
                 <i className="fa fa-envelope me-2"></i>feedback@evote.com
                </a>
              </li>
              <li>
                <a href="#!" className="text-decoration-none text-dark">
                  <i className="fa fa-phone me-2"></i> +91 1234567890
                </a>
              </li>
              <li>
                <a href="#!" className="text-decoration-none text-dark">
                 <i className="fa fa-map-marker me-2"></i> 1234, Anywhere Road, Anytown, CA 12345
                </a>
              </li>
              <li>
                <a href="#!" className="text-decoration-none text-dark">
                <i className="fa fa-globe me-2"></i> www.evote.com
                </a>
              </li>
            </ul>
          </Col>
          <Col xs={12} md={4}>
            <h5 className="text-uppercase fw-bold mb-4">Need Help!</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#!" className="text-decoration-none text-dark">
                  <i className="fa fa-question-circle me-2"></i>FAQs
                </a>
              </li>
              <li>
                <a href="#!" className="text-decoration-none text-dark">
                 <i className="fa fa-phone me-2"></i> +91 1234567890
                </a>
              </li>
              <li>
                <a href="#!" className="text-decoration-none text-dark">
                  Services
                </a>
              </li>
              <li>
                <a href="#!" className="text-decoration-none text-dark">
                  Help and queries
                </a>
              </li>
            </ul>
          </Col>
        </Row>
        <Row>
          <Col className="text-center py-3">
            <p>
              © 20xx Copyright. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
      
    </div>
  )
}

export default Footer
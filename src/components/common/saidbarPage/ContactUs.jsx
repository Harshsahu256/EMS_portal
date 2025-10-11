import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaMobileAlt, FaTwitter, FaFacebookF, FaYoutube } from "react-icons/fa";

const ContactUs = () => {
  return (
    <Container className="my-5">
      <Row>
        {/* Contact Details */}
        <Col md={6}>
          <h5 className="mb-4 fw-bold" style={{ color: "#e74c3c" }}>Contact us</h5>
          <div className="mb-3 d-flex">
            <FaMapMarkerAlt className="me-2 mt-1" style={{ color: "#2c3e50" }} />
            <div>
              <strong>Address :</strong><br />
              Hall No.7, Commercial Chittod Complex, Zone-I,<br />
              Maharana Pratap Nagar, Bhopal, (M.P.) 462 011
            </div>
          </div>

          <div className="mb-3 d-flex">
            <FaPhone className="me-2 mt-1" style={{ color: "#2c3e50" }} />
            <div>
              <strong>Phone :</strong><br />
              0755- 257 2334
            </div>
          </div>

          <div className="mb-3 d-flex">
            <FaMobileAlt className="me-2 mt-1" style={{ color: "#2c3e50" }} />
            <div>
              <strong>Mobile :</strong><br />
              922 922 6534 / 33 / 32<br />
              942 500 8620
            </div>
          </div>

          <div className="mb-3 d-flex">
            <FaEnvelope className="me-2 mt-1" style={{ color: "#2c3e50" }} />
            <div>
              <strong>E-mail :</strong><br />
              <a href="mailto:emsems6@gmail.com" className="text-decoration-none">emsems6@gmail.com</a>
            </div>
          </div>
        </Col>

        {/* Follow Us */}
        <Col md={6}>
          <h5 className="mb-4 fw-bold" style={{ color: "#e74c3c" }}>Follow us</h5>
          <div className="d-flex gap-3">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="btn btn-outline-dark">
              <FaTwitter />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="btn btn-outline-dark">
              <FaFacebookF />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="btn btn-outline-dark">
              <FaYoutube />
            </a>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ContactUs;

import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";

const FormCitta = ({ cambiaCitta }) => {
  const [citta, setCitta] = useState("");
  const inserisciCitta = (e) => {
    setCitta(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (citta.trim()) {
      cambiaCitta(citta);
    }
  };
  return (
    <>
      <Row className="d-flex justify-content-center">
        <Col xs={12} sm={8} md={6} lg={4}>
          <Form onSubmit={handleSubmit} className="d-flex align-items-center justify-content-center gap-3">
            <Form.Group controlId="formCitta">
              <Form.Control
                type="text"
                placeholder="Inserisci la tua città..."
                value={citta}
                onChange={inserisciCitta}
              />
            </Form.Group>
            <Button variant="dark">Cerca</Button>
          </Form>
        </Col>
      </Row>
    </>
  );
};
export default FormCitta;

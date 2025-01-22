import { Container, Row } from "react-bootstrap";
import { ArrowLeft } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

const Dettagli = () => {
  const navigate = useNavigate();

  const handleIndietro = () => {
    navigate("/");
  };
  return (
    <Container>
      <Row>
        <div onClick={handleIndietro}>
          <ArrowLeft style={{ width: "100px", height: "40px" }} className="mt-4" />
        </div>
      </Row>
    </Container>
  );
};
export default Dettagli;

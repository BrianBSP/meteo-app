import { Container, Navbar } from "react-bootstrap";
import LogoSvg from "./LogoSvg";
import DataOggi from "./DataOggi";

const MyNav = () => {
  return (
    <Navbar expand="lg" className="navbar-section">
      <Container className="d-flex justify-content-between navbar-container">
        <div className="d-flex align-items-center gap-3">
          <LogoSvg />
          <span className="navbar-title">3Bri Meteo</span>
        </div>
        <DataOggi />
      </Container>
    </Navbar>
  );
};
export default MyNav;

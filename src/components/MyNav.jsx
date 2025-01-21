import { Container, Navbar } from "react-bootstrap";
import LogoSvg from "./LogoSvg";

const MyNav = () => {
  return (
    <Navbar expand="lg" className="navbar-section">
      <Container>
        <Navbar.Brand href="#home" className="d-flex align-items-center gap-3 navbar-title lato-thin ">
          <LogoSvg />
          3Bri Meteo
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};
export default MyNav;

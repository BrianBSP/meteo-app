import { useEffect, useState } from "react";
import { Badge, Card, Col, Container, Row } from "react-bootstrap";
import { ArrowLeft } from "react-bootstrap-icons";
import { useLocation, useNavigate } from "react-router-dom";

const API_KEY = import.meta.env.VITE_API_KEY;

const Dettagli = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [err, setErr] = useState(null);
  const [forecast, setForecast] = useState(null);

  const { previsioni, latitudine, longitudine, errore } = location.state || {};

  const handleIndietro = () => {
    navigate("/");
  };

  const URL = "https://api.openweathermap.org/data/2.5";

  const fetchPrevisioniGiorni = async () => {
    try {
      const resp = await fetch(`${URL}/forecast?lat=${latitudine}&lon=${longitudine}&appid=${API_KEY}`);
      if (resp.ok) {
        const response = await resp.json();

        const orari = ["00:00:00", "06:00:00", "12:00:00", "18:00:00"];

        const previsioniMeteo = response.list
          .filter((forecast) => orari.some((orario) => forecast.dt_txt.includes(orario)))
          .slice(0, 12);

        setForecast(previsioniMeteo);

        console.log(previsioniMeteo);
      } else {
        setErr("Errore nel recupero dei dati.");
      }
    } catch (error) {
      console.error("Errore nel recupero dei dati meteo ", error);
      setErr("Errore nel recupero dei dati.");
    }
  };

  useEffect(() => {
    fetchPrevisioniGiorni();
  }, []);

  let previsioniClass;
  switch (previsioni.icona) {
    case "01d":
      previsioniClass = "sun";
      break;
    case "01n":
    case "02n":
      previsioniClass = "night text-white";
      break;
    case "02d":
      previsioniClass = "fewclouds";
      break;
    case "03d":
    case "04d":
      previsioniClass = "clouds";
      break;
    case "03n":
    case "04n":
      previsioniClass = "cloudsNight text-white";
      break;
    case "09d":
    case "10d":
      previsioniClass = "rain";
      break;
    case "09n":
    case "10n":
      previsioniClass = "rainNight text-white";
      break;
    case "11d":
      previsioniClass = "thunder";
      break;
    case "11n":
      previsioniClass = "thunerNight text-white";
      break;
    case "13d":
      previsioniClass = "snow";
      break;
    case "13n":
      previsioniClass = "snowNight text-white";
      break;
    case "50d":
    case "50n":
      previsioniClass = "mist";
      break;
    default:
      previsioniClass = "default";
      break;
  }

  console.log(forecast);

  return (
    <Container className={`mt-3 ${previsioniClass}`}>
      <Row>
        <div onClick={handleIndietro}>
          <ArrowLeft style={{ width: "100px", height: "40px", color: "white" }} className="mt-4" />
        </div>
      </Row>

      <Row className="d-flex justify-content-center">
        <Card className="bg-light" style={{ width: "500px" }}>
          {errore && (
            <Row className="justify-content-center mt-2">
              <Col xs={12} sm={8} md={6} lg={4} className="text-center">
                <Badge bg="danger">{errore}</Badge>
              </Col>
            </Row>
          )}
          <div className="text-center">
            {previsioni && <h2 style={{ fontSize: "40px" }}>Città di {previsioni.nome}</h2>}
            <p className="d-flex justify-content-center align-items-center" style={{ fontSize: "25px" }}>
              Il cielo è {previsioni.icona && <img src={`https://openweathermap.org/img/wn/${previsioni.icona}.png`} />}{" "}
              - {previsioni.descrizione}
            </p>
          </div>
          <Row className="justify-content-center align-items-center">
            <Col md={7} style={{ fontSize: "60px" }} className="text-end">
              {previsioni.temperatura}°C
            </Col>
            <Col>
              <div className="mt-3">
                <p>Min {previsioni.min}°C</p>
                <p>Max {previsioni.max}°C</p>
              </div>
            </Col>
          </Row>
          <Row className="row-cols-1">
            <Col className="text-center mt-3" style={{ fontSize: "25px" }}>
              <p className="mb-0">Vento: {previsioni.vento} m/s</p>
              <p>Umidità: {previsioni.umidita} %</p>
            </Col>
          </Row>
        </Card>
      </Row>
      <Row>
        {err && (
          <Row className="justify-content-center mt-2">
            <Col xs={12} sm={8} md={6} lg={4} className="text-center">
              <Badge bg="danger">{err}</Badge>
            </Col>
          </Row>
        )}
        {forecast && (
          <Container>
            <h4>Il meteo dei prossimi giorni a {previsioni.nome}</h4>
          </Container>
        )}
      </Row>
    </Container>
  );
};
export default Dettagli;

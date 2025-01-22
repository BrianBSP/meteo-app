import { useEffect, useState } from "react";
import { Badge, Col, Container, Row } from "react-bootstrap";
import FormCitta from "./FormCitta";
import { ArrowRight } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
/* import DataOggi from "./DataOggi"; */

const API_KEY = import.meta.env.VITE_API_KEY;

const MainSection = () => {
  const [logitudine, setLongitudine] = useState(12.7441515);
  const [latitudine, setLatitudine] = useState(43.9639933);
  const [errore, setErrore] = useState(null);
  const [previsioni, setPrevisioni] = useState({
    nome: "",
    temperatura: null,
    max: null,
    min: null,
    descrizione: "",
    vento: null,
    umidita: null,
    icona: "",
  });

  const URL = "https://api.openweathermap.org/data/2.5";
  const URLgeo = "http://api.openweathermap.org/geo/1.0";

  const fetchCitta = async (citta) => {
    setErrore(null);
    try {
      const resp = await fetch(`${URLgeo}/direct?q=${citta}&limit=1&appid=${API_KEY}`);
      if (resp.ok) {
        const response = await resp.json();
        if (response.length > 0) {
          const lat = response[0].lat;
          const lon = response[0].lon;
          setLatitudine(lat);
          setLongitudine(lon);
          fetchPrevisioni(lat, lon);
        } else {
          setErrore("Città NON trovata.");
        }
      } else {
        setErrore("Errore nel recupero dei dati.");
      }
    } catch (error) {
      console.error("Errore nel recupero dei dati: ", error);
      setErrore("Errore nel recupero dei dati.");
    }
  };

  const fetchPrevisioni = async (lat, lon) => {
    try {
      const resp = await fetch(`${URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
      console.log(resp);

      if (resp.ok) {
        const response = await resp.json();
        console.log(response);

        setPrevisioni({
          temperatura: (Math.round(response.main.temp) - 273.15).toFixed(1),
          max: (Math.round(response.main.temp_max) - 273.15).toFixed(1),
          min: (Math.round(response.main.temp_min) - 273.15).toFixed(1),
          descrizione: response.weather[0].description,
          vento: response.wind.speed,
          umidita: response.main.humidity,
          icona: response.weather[0].icon,
          nome: response.name,
        });
      } else {
        setErrore("Errore nel reupero dei dati meteo.");
      }
    } catch (error) {
      console.error("Errore nel recupero dei dati meteo ", error);
      setErrore("Errore nel recupero dei dati meteo.");
    }
  };

  useEffect(() => {
    fetchPrevisioni(latitudine, logitudine);
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

  const navigate = useNavigate();

  const handleDettaglio = () => {
    navigate(`/detail/${previsioni.nome}`);
  };

  return (
    <Container className={`mt-3 ${previsioniClass}`}>
      <FormCitta cambiaCitta={fetchCitta} />
      <Container>
        {errore && (
          <Row className="justify-content-center mt-2">
            <Col xs={12} sm={8} md={6} lg={4} className="text-center">
              <Badge bg="danger">{errore}</Badge>
            </Col>
          </Row>
        )}

        <Row className="justify-content-center mt-5">
          <Col xs={12} sm={8} md={6} lg={4} className="text-center">
            <h3>{previsioni.nome.toUpperCase()}</h3>
          </Col>
        </Row>
        <Row>
          <Col className="d-flex justify-content-center mt-3">
            {previsioni.icona && (
              <img
                src={`https://openweathermap.org/img/wn/${previsioni.icona}.png`}
                alt="iconaMeteo"
                style={{ width: "80px", height: "80px" }}
              />
            )}
          </Col>
        </Row>
        <Row className="justify-content-center align-items-center">
          <Col md={7} style={{ fontSize: "100px" }} className="text-end">
            {previsioni.temperatura}°C
          </Col>
          <Col>
            <div className="mt-3">
              <p>Min {previsioni.min}°C</p>
              <p>Max {previsioni.max}°C</p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="d-flex justify-content-center mt-3">
            <p style={{ fontSize: "80px" }}>{previsioni.descrizione}</p>
          </Col>
        </Row>
        <Row>
          <Col className="d-flex justify-content-end">
            <div className="d-flex align-items-center" onClick={handleDettaglio}>
              <span className="text-white">ULTERIORI DETTAGLI</span>
              <ArrowRight style={{ width: "100px", height: "40px" }} />
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};
export default MainSection;

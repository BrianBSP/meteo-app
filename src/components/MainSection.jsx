import { useEffect, useState } from "react";
import { Badge, Col, Container, Row } from "react-bootstrap";
import FormCitta from "./FormCitta";
import DataOggi from "./DataOggi";

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
          temperatura: Math.round(response.main.temp),
          max: Math.round(response.main.temp_max),
          min: Math.round(response.main.temp_min),
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

  return (
    <Container className="mt-3">
      <FormCitta cambiaCitta={fetchCitta} />
      <Container>
        {errore && (
          <Row className="justify-content-center mt-2">
            <Col xs={12} sm={8} md={6} lg={4} className="text-center">
              <Badge bg="danger">{errore}</Badge>
            </Col>
          </Row>
        )}
        <Row className="justify-content-center mt-4">
          <Col xs={12} sm={8} md={6} lg={4} className="text-center">
            <DataOggi />
          </Col>
        </Row>
        <Row className="justify-content-center mt-3">
          <Col xs={12} sm={8} md={6} lg={4} className="text-center">
            <h3>{previsioni.nome.toUpperCase()}</h3>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};
export default MainSection;

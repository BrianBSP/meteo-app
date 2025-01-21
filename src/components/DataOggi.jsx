import { Badge } from "react-bootstrap";

const DataOggi = () => {
  const dataDiOggi = () => {
    const giorni = ["Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato", "Domenica"];
    const mesi = [
      "Gennaio",
      "Febbraio",
      "Marzo",
      "Aprile",
      "Maggio",
      "Giugno",
      "Luglio",
      "Agosto",
      "Settembre",
      "Ottobre",
      "Novembre",
      "Dicembre",
    ];

    const oggi = new Date();
    const giornoSettimana = giorni[oggi.getDay()];
    const giorno = oggi.getDate();
    const mese = mesi[oggi.getMonth()];

    return `${giornoSettimana}, ${giorno} ${mese}`;
  };
  return (
    <>
      <Badge bg="primary">{dataDiOggi()}</Badge>
    </>
  );
};
export default DataOggi;

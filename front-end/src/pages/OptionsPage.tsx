import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { confirmTrip } from "../services/api";
import axios from "axios";

const OptionsPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");
  const [originAddress, setOriginAddress] = useState<string>("");
  const [destinationAddress, setDestinationAddress] = useState<string>("");

  const tripData = state?.tripData;
  const customer_id = state?.customer_id;

  if (!tripData) {
    return <p>Erro: Nenhuma informação de viagem disponível. Volte e tente novamente.</p>;
  }

  const getAddressFromCoordinates = async (latitude: number, longitude: number) => {
    const apiKey = process.env.GOOGLE_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

    try {
      const response = await axios.get(url);
      const results = response.data.results;
      return results.length > 0 ? results[0].formatted_address : "Endereço não encontrado";
    } catch (error) {
      console.error("Erro ao buscar endereço:", error);
      return "Erro ao buscar endereço";
    }
  };

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const origin = await getAddressFromCoordinates(tripData.origin.latitude, tripData.origin.longitude);
        const destination = await getAddressFromCoordinates(tripData.destination.latitude, tripData.destination.longitude);
        setOriginAddress(origin);
        setDestinationAddress(destination);
      } catch (err) {
        console.log(err)
        setError("Erro ao obter os endereços das coordenadas.");
      }
    };

    fetchAddresses();
  }, [tripData]);

  const handleChooseDriver = async (driverId: number) => {
    try {
      setError("");

      const tripPayload = {
        customer_id: customer_id,
        origin: originAddress,
        destination: destinationAddress,
        distance: tripData.distance,
        duration: tripData.duration,
        driver: { id: driverId, name: tripData.options.find((opt: any) => opt.id === driverId)?.name },
        value: tripData.options.find((opt: any) => opt.id === driverId)?.value,
      };

      console.log(tripPayload);
      await confirmTrip(tripPayload);
      navigate("/history");
    } catch (err: any) {
      if (err.response?.data?.error_description) {
        setError(`Erro: ${err.response.data.error_description}`);
      } else {
        setError("Erro inesperado ao confirmar a viagem. Tente novamente.");
      }
    }
  };

  return (
    <div>
      <h1>Opções de Viagem</h1>
      {/* Exibe o erro, se houver */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Endereços */}
      <p><strong>Origem:</strong> {originAddress || "Carregando..."}</p>
      <p><strong>Destino:</strong> {destinationAddress || "Carregando..."}</p>

      {/* Imagem do mapa, se estiver disponível */}
      {tripData.mapUrl && <img src={tripData.mapUrl} alt="Mapa da Rota" />}
      
      <div>
        {tripData.options.map((option: any) => (
          <div key={option.id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
            <h2>{option.name}</h2>
            <p>Descrição: {option.description}</p>
            <p>Veículo: {option.vehicle}</p>
            <p>Avaliação: {option.review.rating}</p>
            <p>Valor: R$ {option.value.toFixed(2)}</p>
            <button onClick={() => handleChooseDriver(option.id)}>Escolher</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OptionsPage;

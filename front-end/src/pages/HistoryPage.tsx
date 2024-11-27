import { useState } from "react";
import { getTripHistory } from "../services/api";

const HistoryPage = () => {
  const [filters, setFilters] = useState({ customer_id: "004bba97-d81f-45c8-baf4-7a33092aab5a", driver_id: "" });
  const [trips, setTrips] = useState([]);
  const [error, setError] = useState("");

  const handleFilter = async () => {
    try {
      setError("");
      const data = await getTripHistory(filters.customer_id, filters.driver_id);
      setTrips(data.rides);
    } catch (err) {
      setError("Erro ao buscar histórico. Tente novamente.");
    }
  };

  return (
    <div>
      <h1>Histórico de Viagens</h1>
      {/* Formulário de filtro */}
      <input type="text" placeholder="ID do usuário" />
      <select>
        <option value="">Todos os motoristas</option>
        {/* Opções de motoristas */}
      </select>
      <button onClick={handleFilter}>Aplicar Filtro</button>
      {/* Exibir histórico */}
      <div>
        {trips.map((trip: any) => (
          <div key={trip.id}>
            <p>{trip.date}</p>
            <p>{trip.driver.name}</p>
            <p>{trip.origin}</p>
            <p>{trip.destination}</p>
            <p>{trip.value}</p>
            {/* Outras informações */}
          </div>
        ))}
      </div>
      {error && <p>{error}</p>}
    </div>
  );
};

export default HistoryPage;

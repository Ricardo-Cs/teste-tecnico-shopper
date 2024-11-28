import { useState } from "react";
import { getTripHistory } from "../services/api";

const HistoryPage = () => {
  const [filters, setFilters] = useState({ customer_id: "", driver_id: "" });
  const [rides, setRides] = useState([]);
  const [error, setError] = useState("");

  const handleFilter = async () => {
    try {
      setError("");
      setRides([]);
      const data = await getTripHistory(filters.customer_id, filters.driver_id);
      if(data.rides.length == 0) {
        setError("Sem viagens registradas!.");
      }
      setRides(data.rides);
    } catch (err) {
      setError("Erro ao buscar histórico. Tente novamente.");
    }
  };

  return (
    <div>
      <h2>Histórico de Viagens</h2>
      <input
        type="text"
        placeholder="ID do usuário"
        value={filters.customer_id}
        onChange={(e) =>
          setFilters((prev) => ({ ...prev, customer_id: e.target.value }))
        }
      />
      <select
        value={filters.driver_id}
        onChange={(e) =>
          setFilters((prev) => ({ ...prev, driver_id: e.target.value }))
        }
      >
        <option value="">Todos os motoristas</option>
        <option value="1">Homer Simpson</option>
        <option value="2">Dominic Toretto</option>
        <option value="3">James Bond</option>
      </select>
      <button onClick={handleFilter} id="filterButton">Aplicar Filtro</button>
      <div id="rideOptions">
        {rides.map((ride: any) => (
          <div key={ride.id}>
            <p>Data: {new Date(ride.date).toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}       
            </p>
            <p>Motorista: {ride.driver.name}</p>
            <p>Origem: {ride.origin}</p>
            <p>Destino: {ride.destination}</p>
            <p>Valor: R$ {ride.value.toFixed(2)}</p>
          </div>
        ))}
      </div>
      {error && <p>{error}</p>}
    </div>
  );
};

export default HistoryPage;

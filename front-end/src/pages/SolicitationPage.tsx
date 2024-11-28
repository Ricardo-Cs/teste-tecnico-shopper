import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { estimateTrip } from "../services/api";

const SolicitationPage = () => {
  const [formData, setFormData] = useState({ customer_id: "", origin: "", destination: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      setError("");
      const result = await estimateTrip(formData);
      navigate("/options", { state: { tripData: result, customer_id: formData.customer_id } });
    } catch (err) {
      setError("Erro ao estimar a viagem. Tente novamente.");
    }
  };

  return (
    <div>
      <h2>Solicitação de Viagem</h2>
      <form>
        <div>
          <label htmlFor="customer_id">ID do usuário</label>
          <input
            id="customer_id"
            type="text"
            name="customer_id"
            placeholder="ex.: 1"
            value={formData.customer_id}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="origin">Origem</label>
          <input
            id="origin"
            type="text"
            name="origin"
            placeholder="ex.: Avenida Paulista, 1578, São Paulo, SP, Brasil"
            value={formData.origin}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="destination">Destino</label>
          <input
            id="destination"
            type="text"
            name="destination"
            placeholder="ex.: Av. Atlântica, Copacabana, Rio de Janeiro, RJ, Brasil"
            value={formData.destination}
            onChange={handleChange}
          />
        </div>
        <button type="button" onClick={handleSubmit}>Estimar Viagem</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default SolicitationPage;

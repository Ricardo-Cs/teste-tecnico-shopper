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
        <input
          type="text"
          name="customer_id"
          placeholder="ID do usuário"
          value={formData.customer_id}
          onChange={handleChange}
        />
        <input
          type="text"
          name="origin"
          placeholder="Origem"
          value={formData.origin}
          onChange={handleChange}
        />
        <input
          type="text"
          name="destination"
          placeholder="Destino"
          value={formData.destination}
          onChange={handleChange}
        />
        <button type="button" onClick={handleSubmit}>Estimar Viagem</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default SolicitationPage;

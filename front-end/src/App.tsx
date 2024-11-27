import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SolicitationPage from './pages/SolicitationPage'
import OptionsPage from './pages/OptionsPage'
import HistoryPage from './pages/HistoryPage'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SolicitationPage />} />
        <Route path="/options" element={<OptionsPage />} />
        <Route path="/history" element={<HistoryPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

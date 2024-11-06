import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Login } from "./pages/login/login"
import { Solicitacao } from "./pages/solicitacao/solicitacao"
import Navbar from "./components/navbar/navbar"
import { Secretaria } from "./pages/secretaria/secretaria"

function Rotas() {
    return <BrowserRouter>
        <Routes>
            <Route path="/login" element={<Login/>} />
            <Route path="/solicitacao" element={<Solicitacao />} />
            <Route path="/navbar" element={<Navbar />} />
            <Route path="/secretaria" element={<Secretaria />} />
        </Routes>
    </BrowserRouter>
}

export default Rotas
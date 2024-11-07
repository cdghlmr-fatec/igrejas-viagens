import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Login } from "./pages/login/login"
import { Solicitacao } from "./pages/solicitacao/solicitacao"
import Navbar from "./components/navbar/navbar"

function Rotas() {
    return <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="/solicitacao" element={<Solicitacao />} />
            <Route path="/navbar" element={<Navbar />} />
        </Routes>
    </BrowserRouter>
}

export default Rotas
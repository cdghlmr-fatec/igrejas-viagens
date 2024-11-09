import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Login } from "./pages/login/login"
import { Solicitacao } from "./pages/solicitacao/solicitacao"
import Navbar from "./components/navbar/navbar"
import { Secretaria } from "./pages/secretaria/secretaria"
import { Home } from "./pages/home/home"
import { Coordenador } from "./pages/coordenador/coordenador"
import { Admin } from "./pages/admin/admin"
// import ResetPasswordPage from "./pages/reset/reset"

function Rotas() {
    return <BrowserRouter>
        <Navbar />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/solicitacao" element={<Solicitacao />} />
            <Route path="/secretaria" element={<Secretaria />} />
            <Route path="/coordenador" element={<Coordenador />} />
            <Route path="/admin" element={<Admin />} />
            {/* <Route path="/reset" element={<ResetPasswordPage />} /> */}
        </Routes>
    </BrowserRouter>
}

export default Rotas
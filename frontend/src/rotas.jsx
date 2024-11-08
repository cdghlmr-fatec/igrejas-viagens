import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Login } from "./pages/login/login"
import { Solicitacao } from "./pages/solicitacao/solicitacao"
import Navbar from "./components/navbar/navbar"
<<<<<<< HEAD
=======
import { Secretaria } from "./pages/secretaria/secretaria"
import { Home } from "./pages/home"
import { Coordenador } from "./pages/coordenador/coordenador"
import { Admin } from "./pages/admin/admin"
>>>>>>> dev

function Rotas() {
    return <BrowserRouter>
        <Routes>
<<<<<<< HEAD
            <Route path="/" element={<Login/>} />
            <Route path="/solicitacao" element={<Solicitacao />} />
            <Route path="/navbar" element={<Navbar />} />
=======
            <Route path="/" element={<Home/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/solicitacao" element={<Solicitacao />} />
            <Route path="/navbar" element={<Navbar />} />
            <Route path="/secretaria" element={<Secretaria />} />
            <Route path="/coordenador" element={<Coordenador />} />
            <Route path="/admin" element={<Admin />} />
>>>>>>> dev
        </Routes>
    </BrowserRouter>
}

export default Rotas
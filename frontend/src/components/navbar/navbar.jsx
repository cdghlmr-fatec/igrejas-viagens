import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logoWhite.ConexAp.png";

function Navbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('roles');
        navigate('/login');
    };

    // Verifica se o token está presente
    const isAuthenticated = !!localStorage.getItem('token');

    return (
        <nav className="cabecalho navbar fixed-top navbar-expand-lg" data-bs-theme="dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    <img className="navbar-logo" src={logo} alt="Logo" />
                </Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {/* Itens de navegação à esquerda, se necessário */}
                    </ul>

                    <ul className="navbar-nav "> {/* Alinhando itens à direita */}
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Escursões</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/coordenador">Coordenadores</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/secretaria">Secretaria</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/coordenador">Coordenador</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/admin">Admin</Link>
                        </li>
                    </ul>

                    {isAuthenticated && ( // Exibe o botão de opções apenas se o usuário estiver autenticado
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <div className="btn-group">
                                    <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                        Opções
                                    </button>
                                    <ul className="dropdown-menu dropdown-menu-end">
                                        <li><Link className="dropdown-item" to="/">Meu Perfil</Link></li>
                                        <li><hr className="dropdown-divider" /></li>
                                        <li><button className="dropdown-item" onClick={handleLogout}>Desconectar</button></li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
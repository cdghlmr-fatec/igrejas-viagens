import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './login.css'

import logo from '../../assets/ConexAp.png'
import fundo from '../../assets/fundoConex.jpg'

export function Login() {
    return <div className="row mt-page h-100 w-100 m-0 p-0 ">
        <div className="col-sm-5 d-flex justify-content-center align-items-center text-center">

            <form className="form-signin w-75 justify-content-center align-items-center text-center p-0">
                <div className="justify-content-center align-items-center text-center">
                    <img src={logo} className="logo mb-2" />
                    <div className='d-flex justify-content-center align-items-center text-center'>
                        <h4 className="mb-4 w-100">Gerencie sua excursão de forma descomplicada.</h4>
                    </div>
                    <h5 className="mb-4 text-secondary">Acesse sua conta</h5>
                </div>
                <div className="mt-4">
                    <input className="w-75" type="email" placeholder="E-mail" />
                </div>
                <div className="mt-2">
                    <input className="w-75" type="password" placeholder="Senha" />
                </div>
                <div className="mt-3 mb-5">
                    <button className="btn-login btn btn-primary w-75" type="button">Login</button>
                </div>

                <div>
                    <span className="me-1">Não tenho uma conta.</span>
                    <Link to="/solicitacao">Solicite agora!</Link>
                </div>
            </form>
        </div>

        <div className="col-sm-7 p-0">
            <img src={fundo} className="background-login" />
        </div>

    </div>
    
}
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './solicitacao.css'

import logo from '../../assets/ConexAp.png'
import fundo from '../../assets/fundoConex.jpg'

export function Solicitacao() {
    return <div className="row mt-page h-100 w-100 m-0 p-0 ">
        <div className="col-sm-5 d-flex justify-content-center align-items-center text-center">

            <form className="form-signin w-75 justify-content-center align-items-center text-center p-0">
                <div className="justify-content-center align-items-center text-center">
                    <img src={logo} className="logo mb-2" />
                    <h4 className="mb-4 w-100">Solicite sua conta.</h4>                 
                    <h5 className="mb-4 text-secondary">Preencha os campos abaixo.</h5>
                </div>
                <div className="mt-2">
                    <input className="w-75" type="text" placeholder="Informe o seu nome completo" />
                </div>
                <div className="mt-2">
                    <input className="w-75" type="text" placeholder="Informe o seu melhor e-mail " />
                </div>
                <div className="mt-2">
                    <input className="w-75" type="text" placeholder="Informe a igreja que congrega" />
                </div>
                <div className="mt-2">
                    <input className="w-75" type="phone" placeholder="Informe um telefone para contato" />
                </div>
                <div className="mt-3 mb-5">
                    <button className="btn-login btn btn-primary w-75" type="button">Solicitar minha conta</button>
                </div>

                <div>
                    <span className="me-1">Já tenho uma conta.</span>
                    <Link to="/">Acessar agora!</Link>
                </div>
            </form>
        </div>

        <div className="col-sm-7 p-0">
            <img src={fundo} className="background-login" />
        </div>

    </div>
    
}
import React, { useState } from 'react';
import './indexPage.css'
import { Login } from './login/login';
import { Registro } from './register/registro';

export const IndexPage = () => {
    const [showLogin, setShowLogin] = useState(true);
    const toggleForm = () => {
        setShowRegister(false)

        setTimeout(() => {
            setShowLogin(!showLogin);
        }, 500); // Ajusta el tiempo de retraso según lo que necesites
    };
    const [showRegister, setShowRegister] = useState(false);

    return (
        <div className='Index-Page'>
            <div className='Header-Login'>
                <h2 className="Logo">EasyPlanning</h2>
                <ul className="navegacion">
                    <a href="/">Inicio</a>
                    <a href="/informacion">Información</a>
                    <a href="/contactanos">Contáctenos</a>
                    <button className="btnInciarSesion" onClick={toggleForm}>Iniciar Sesión</button>
                </ul>
            </div>
            <div className="index-login">
                <div className={`loginindex ${showLogin ? 'show' : ''}`}>
                    {showLogin && (
                    <Login
                        setShowLogin={setShowLogin}
                        setShowRegister={setShowRegister}
                    />
                )}
                </div>
                <div className={`registerindex ${showRegister ? 'show' : ''}`}>
                {showRegister && (
                    <Registro
                        setShowLogin={setShowLogin}
                        setShowRegister={setShowRegister}
                    />
                )}
                </div>
            </div>
        </div>
    );
}


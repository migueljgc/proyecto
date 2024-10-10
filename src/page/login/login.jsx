import React, { useEffect, useState } from 'react';
import './login.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faUser, faXmark } from '@fortawesome/free-solid-svg-icons';

export const Login = ({ setShowLogin, setShowRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  useEffect(() => {
    document.title = "Login"

  }, []);
  const register = () => {
    setShowLogin(false)
    setTimeout(() => {
      setShowRegister(true) 
    }, 500); // Ajusta el tiempo de retraso según lo que necesites
    
  }

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/auth/authenticate', { user: email, password });
      if (response.status === 200) {
        const { token, authorities } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify({ user: email, roles: authorities[0] }));

        if (authorities.includes('ADMIN')) {
          window.location.href = '/GestionarReserva';
        } else if (authorities.includes('USER')) {
          window.location.href = '/Index';
        } else {
          window.location.href = '/';
        }
      } else {
        alert('Credenciales incorrectas');
      }
    } catch (error) {
      alert('Usuario y/o Contraseña Incorrectos');
    }

    if (rememberMe) {
      localStorage.setItem('username', email);
      localStorage.setItem('password', password);
    }
  };

  return (
    <div className='login'>
      <div className='datoslogin'>
        <span className="icono-cerrar" onClick={() => setShowLogin(false)}>
          <FontAwesomeIcon icon={faXmark} />
        </span>
        <div className="contenedor-form-Login">
          <h2>Iniciar Sesión</h2>
          <form onSubmit={handleLoginSubmit}>
            <div className="contenedor-input">
              <span className="icono"  >
                <FontAwesomeIcon icon={faEnvelope} />
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label>Email</label>
            </div>

            <div className="contenedor-input">
              <span className="icono">
                <FontAwesomeIcon icon={faLock} />
              </span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label>Contraseña</label>
            </div>

            <div className="recordar">
              <label>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                Recordar Sesión
              </label>
              <a href="#">¿Olvidaste tu contraseña?</a>
            </div>

            <button type="submit" className="btnIniciar">Iniciar Sesión</button>

            <div className="registrar">
              <p>
                ¿No tienes cuenta?{' '}
                <a href="#" className="registrar-link" onClick={register}>
                  Regístrate
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

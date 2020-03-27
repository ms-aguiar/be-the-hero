import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';

import './styles.css';
import api from '../../services/api';

export default function NewIncident() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    const history = useHistory();
    const ongId = localStorage.getItem('ongId');

    function handleNewIncident(e) {
        e.preventDefault();

        const data = {
            title,
            description,
            value
        }

        try {
            api.post('/incidents', data, {
                headers: {
                    Authorization: ongId
                }
            });
            alert('Caso cadastrado com sucesso!')
            history.push('/profile')
        } catch (err){
            alert('Erro ao cadastrar novo caso.');
        }

    }

    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>

                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o texto detalhadamente para encontrar um heroi para resolver isso.</p>

                    <Link to="/" className="back-link">
                        <FiArrowLeft size={26} color="#E02041" />
                        Voltar para home
                    </Link>

                </section>
                <form>
                    <input 
                    placeholder="Título do caso"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    />

                    <textarea 
                    placeholder="Descrição"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    />

                    <input 
                    placeholder="Valor em reais"
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    />

                    <button onClick={handleNewIncident} className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}
import { useNavigate, Link, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import api from '../../services/api'

export default function NewUpdateCar(){

  const navigate = useNavigate();
  const {carId} = useParams();

  const[id, setId] = useState(carId);
  const[name, setName] = useState('');
  const[description, setDescription] = useState('');

  async function loadCar(){
    try{
      const response = await api.get(`cars/${id}`);
      setId(response.data.id);
      setName(response.data.name);
      setDescription(response.data.description);

    }catch(err){
      alert("Erro ao carregar carros!");
      navigate('/');
    }
  }

  // Carrega dados na abertura da tela e monitora mudança em carId
  useEffect(() => {
    if (carId === '0') return;
    else loadCar();

  },[carId]);

  // CREATE, cria carro na API
  async function saveOrUpdate(e){
    e.preventDefault();

    const data = {
      name,
      description
    };

    try{
      if (carId === '0'){
        await api.post('cars',data,{});
        navigate('/');
      }else{
        data.id = carId;
        await api.patch(`cars/${carId}`,data,{});
      navigate('/');
      }
    }catch(err){
      alert("Erro ao criar carro!");
    }
  }

  return(

    <div className="card border-primary" style={{marginTop: '20px'}} >
      <div className="card-header bg-primary" style={{color: '#fff'}}>
        CRUD REACT
      </div>
      <div className="card-body">

        <Link className="btn btn-dark" style={{marginBottom: '5px'}}
          to="/">Home</Link>
            <h1 className="bg-primary text-white">
              {carId === '0' ? 'Cadastrar carro' : 'Atualizar carro'}
            </h1>
          <form onSubmit={saveOrUpdate}>
            <div className="form-group">
              <label htmlFor="name">Name</label>

              <input
              id="name"
              type="text"
              className="form-control"
              placeholder="Name"
              value={name}
              onChange={e => setName(e.target.value)}></input>
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>

              <input
              id="description"
              type="text"
              className="form-control"
              placeholder="Description"
              value={description}
              onChange={e => setDescription(e.target.value)}></input>
            </div>
            <button type="submit" className="btn btn-primary">Enviar</button>
          </form>

      </div>
    </div>

  );
}

import React, { useState, useEffect } from 'react';
import api from '../../services/api'
import { Link, useNavigate } from 'react-router-dom';

export default function Cars() {

  const [my_cars, setCars] = useState([]);

  const navigate = useNavigate();

  // READ, carrega dados da API
  useEffect(() => {
    api.get('cars',{}).then(response => {setCars(response.data)})
  },[])

  // UPDATE, atualiza dados na API
  async function updateCar(id){
    try{
      navigate(`cars/${id}`);
    }catch(err){
      alert("Erro ao atualizar, tente novamente!");
    }
  }

  // DELETE, apaga dados na API
  async function deleteCar(id){
    try{
      await api.delete(`cars/${id}`,{});
      setCars(my_cars.filter(car => car.id !== id))
    }catch(err){
      alert("Erro ao excluir, tente novamente!");
    }
  }


  return(

    <div className="card border-primary" style={{marginTop: '20px'}}>
      <div className="card-header bg-primary" style={{color: '#fff'}}>
        CRUD REACT
      </div>
      <div className="card-body">
      <Link className="btn btn-success" style={{marginBottom: '10px'}}
      to="/cars/0">Novo</Link>

        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Ações</th>
            </tr>
          </thead>
          <tbody>
            {my_cars.map(car => (
              <tr key={car.id}>
                <th scope="row">{car.id}</th>
                  <td>{car.name}</td>
                  <td>{car.description}</td>
                  <td>
                    <button type="button"
                    className="btn btn-outline-info"
                    style={{margin: '2px'}}
                    onClick={() => updateCar(car.id)}
                    >Editar</button>

                    <button type="button"
                    className="btn btn-outline-danger"
                    style={{margin: '2px'}}
                    onClick={() => deleteCar(car.id)}
                    >Apagar</button>

                  </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>

  );
}

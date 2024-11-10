import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';

const ExcursaoList = ({ excursaoData = [], fetchExcursaoData }) => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ id: '', destino: '', data: '' });
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    console.log('Excursao Data:', excursaoData);
  }, [excursaoData]);

  const handleShowModal = (excursao = null) => {
    setEditing(!!excursao);
    setFormData(excursao || { id: '', destino: '', data: '' });
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      if (editing) {
        await axios.put(`http://localhost:8080/api/secretaria/excursao/${formData.id}`, formData, {
          headers: { 'Authorization': `Bearer ${token}` },
        });
      } else {
        await axios.post('http://localhost:8080/api/secretaria/excursao', formData, {
          headers: { 'Authorization': `Bearer ${token}` },
        });
      }
      fetchExcursaoData(token);
      setShowModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:8080/api/secretaria/excursao/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      fetchExcursaoData(token);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Button variant="primary" onClick={() => handleShowModal()}>Adicionar Excursão</Button>
      <ul className="list-group mt-3">
        {excursaoData.map((excursao) => (
          <li key={excursao.id} className="list-group-item d-flex justify-content-between">
            {excursao.destination} - {excursao.date} - {excursao.busIds.map((busId) => busId + ' ')} - {excursao.reservations.map((reservation) => reservation + ' ')}
            <div>
              <Button variant="warning" onClick={() => handleShowModal(excursao)}>Editar</Button>
              <Button variant="danger" className="ms-2" onClick={() => handleDelete(excursao.id)}>Excluir</Button>
            </div>
          </li>
        ))}
      </ul>

      {/* Modal de Adicionar/Editar Excursão */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{editing ? 'Editar Excursão' : 'Adicionar Excursão'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="destino">
              <Form.Label>Destino</Form.Label>
              <Form.Control
                type="text"
                name="destino"
                value={formData.destino}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="data" className="mt-2">
              <Form.Label>Data</Form.Label>
              <Form.Control
                type="date"
                name="data"
                value={formData.data}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">{editing ? 'Salvar' : 'Adicionar'}</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ExcursaoList;
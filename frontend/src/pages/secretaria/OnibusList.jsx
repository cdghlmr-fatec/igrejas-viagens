import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';

const OnibusList = ({ onibusData = [], fetchOnibusData }) => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    placa: '',
    modelo: '',
    capacidade: '',
    motorista: '',
    status: '',
  });
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    console.log('Onibus Data:', onibusData);
  }, [onibusData]);

  const handleShowModal = (onibus = null) => {
    setEditing(!!onibus);
    setFormData(onibus || { id: '', placa: '', modelo: '', capacidade: '', motorista: '', status: '' });
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
        await axios.put(`http://localhost:8080/api/secretaria/onibus/${formData.id}`, formData, {
          headers: { 'Authorization': `Bearer ${token}` },
        });
      } else {
        await axios.post('http://localhost:8080/api/secretaria/onibus', formData, {
          headers: { 'Authorization': `Bearer ${token}` },
        });
      }
      fetchOnibusData(token);
      setShowModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:8080/api/secretaria/onibus/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      fetchOnibusData(token);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Button variant="primary" onClick={() => handleShowModal()}>Adicionar Ônibus</Button>
      <ul className="list-group mt-3">
        {onibusData.map((onibus) => (
          <li key={onibus.id} className="list-group-item d-flex justify-content-between">
            {onibus.plate} - {onibus.capacity} - {onibus.model} - {onibus.driverName} - {onibus.status}
            <div>
              <Button variant="warning" onClick={() => handleShowModal(onibus)}>Editar</Button>
              <Button variant="danger" className="ms-2" onClick={() => handleDelete(onibus.id)}>Excluir</Button>
            </div>
          </li>
        ))}
      </ul>

      {/* Modal de Adicionar/Editar Ônibus */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{editing ? 'Editar Ônibus' : 'Adicionar Ônibus'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="placa">
              <Form.Label>Placa</Form.Label>
              <Form.Control
                type="text"
                name="placa"
                value={formData.placa}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="modelo" className="mt-2">
              <Form.Label>Modelo</Form.Label>
              <Form.Control
                type="text"
                name="modelo"
                value={formData.modelo}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="capacidade" className="mt-2">
              <Form.Label>Capacidade</Form.Label>
              <Form.Control
                type="number"
                name="capacidade"
                value={formData.capacidade}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="motorista" className="mt-2">
              <Form.Label>Motorista</Form.Label>
              <Form.Control
                type="text"
                name="motorista"
                value={formData.motorista}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="status" className="mt-2">
              <Form.Label>Status</Form.Label>
              <Form.Control
                type="text"
                name="status"
                value={formData.status}
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

export default OnibusList;
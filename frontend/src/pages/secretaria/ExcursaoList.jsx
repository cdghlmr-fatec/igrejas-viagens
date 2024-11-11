import React, { useState } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';

const ExcursaoList = ({ excursaoData = [], fetchExcursaoData }) => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ id: '', date: '', destination: '', busIds: [''], reservations: [''] });
  const [editing, setEditing] = useState(false);

  const handleShowModal = (excursao = null) => {
    setEditing(!!excursao);
    setFormData(excursao || { id: '', date: '', destination: '', busIds: [''], reservations: [''] });
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBusIdChange = (index, value) => {
    const newBusIds = [...formData.busIds];
    newBusIds[index] = value;
    setFormData((prev) => ({ ...prev, busIds: newBusIds }));
  };

  const addBusIdField = () => {
    setFormData((prev) => ({ ...prev, busIds: [...prev.busIds, ''] }));
  };

  const removeBusIdField = (index) => {
    const newBusIds = formData.busIds.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, busIds: newBusIds }));
  };

  const handleReservationChange = (index, value) => {
    const newReservations = [...formData.reservations];
    newReservations[index] = value;
    setFormData((prev) => ({ ...prev, reservations: newReservations }));
  };

  const addReservationField = () => {
    setFormData((prev) => ({ ...prev, reservations: [...prev.reservations, ''] }));
  };

  const removeReservationField = (index) => {
    const newReservations = formData.reservations.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, reservations: newReservations }));
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
      console.log('Excursao Data:', excursaoData);
    } catch (error) {
      console.log(error);
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
            <Form.Group controlId="date">
              <Form.Label>Data</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="destination" className="mt-2">
              <Form.Label>Destino</Form.Label>
              <Form.Control
                type="text"
                name="destination"
                value={formData.destination}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="busIds" className="mt-2">
              <Form.Label>IDs dos Ônibus</Form.Label>
              {formData.busIds.map((busId, index) => (
                <div key={index} className="d-flex mb-2">
                  <Form.Control
                    type="text"
                    value={busId}
                    onChange={(e) => handleBusIdChange(index, e.target.value)}
                    required
                  />
                  <Button type="button" variant="danger" className="ms-2" onClick={() => removeBusIdField(index)}>Remover</Button>
                </div>
              ))}
              <Button type="button" variant="secondary" className="mt-2" onClick={addBusIdField}>Adicionar ID de Ônibus</Button>
            </Form.Group>
            <Form.Group controlId="reservations" className="mt-2">
              <Form.Label>Reservas</Form.Label>
              {formData.reservations.map((reservation, index) => (
                <div key={index} className="d-flex mb-2">
                  <Form.Control
                    type="text"
                    value={reservation}
                    onChange={(e) => handleReservationChange(index, e.target.value)}
                  />
                  <Button type="button" variant="danger" className="ms-2" onClick={() => removeReservationField(index)}>Remover</Button>
                </div>
              ))}
              <Button type="button" variant="secondary" className="mt-2" onClick={addReservationField}>Adicionar Reserva</Button>
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">{editing ? 'Salvar' : 'Adicionar'}</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ExcursaoList;
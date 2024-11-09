import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';

const ResetPasswordPage = () => {
  const [email, setEmail] = useState('');

  const handleResetPassword = () => {
    // Lógica para enviar email de reset de senha
    console.log('Email de reset enviado para:', email);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Reset de Senha
      </Typography>
      <form onSubmit={handleResetPassword}>
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button variant="contained" color="primary" fullWidth type="submit">
          Enviar Email de Reset
        </Button>
      </form>
    </Container>
  );
};

export default ResetPasswordPage;
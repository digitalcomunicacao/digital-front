
import { useSearchParams } from 'react-router-dom'; // ou useRouter no Next.js
import { TextField, Button, Typography, Container } from '@mui/material';
import api from '../../config/Api';
import { useState } from 'react';

export const NovaSenha = () => {
  const [novaSenha, setNovaSenha] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem('');
    setErro('');
    alert(token)
    try {
      const response = await api.post('reset-password/confirm', {
        token,
        novaSenha,
      });

      setMensagem(response.data.message);
    } catch (err) {
      setErro(err.response?.data?.message || 'Erro ao redefinir a senha');
      console.log(err)
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Typography variant="h5" gutterBottom>
        Redefinir Senha
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          type="password"
          label="Nova Senha"
          variant="outlined"
          fullWidth
          margin="normal"
          value={novaSenha}
          onChange={(e) => setNovaSenha(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Alterar Senha
        </Button>
      </form>

      {mensagem && (
        <Typography variant="body1" color="success.main" sx={{ mt: 2 }}>
          {mensagem}
        </Typography>
      )}
      {erro && (
        <Typography variant="body1" color="error" sx={{ mt: 2 }}>
          {erro}
        </Typography>
      )}
    </Container>
  );
};


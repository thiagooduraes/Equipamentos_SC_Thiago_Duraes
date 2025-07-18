import React, { useState, useEffect } from 'react';
import {
  Typography,
  Box,
  TextField,
  Button,
  Paper,
  Alert,
  CircularProgress,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useParams } from 'react-router-dom';

function TipoMaquinaFormPage() {
  const [descricaoTipo, setDescricaoTipo] = useState('');
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      setIsEditMode(true);
      setLoading(true);
      const fetchTipoMaquina = async () => {
        try {
          const response = await fetch(`/api/tipo_maquinas/${id}`);
          if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Erro HTTP: ${response.status} - ${errorText}`);
          }
          const data = await response.json();
          setDescricaoTipo(data.descricao);
        } catch (err) {
          console.error("Erro ao carregar tipo de máquina para edição:", err);
          setErrorMessage("Falha ao carregar dados do tipo de máquina para edição.");
        } finally {
          setLoading(false);
        }
      };
      fetchTipoMaquina();
    } else {
      setIsEditMode(false);
      setDescricaoTipo('');
    }
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSuccessMessage(null);
    setErrorMessage(null);

    if (!descricaoTipo.trim()) {
      setErrorMessage("A descricao do tipo de máquina não pode ser vazio.");
      return;
    }

    try {
      const method = isEditMode ? 'PUT' : 'POST';
      const url = isEditMode ? `/api/tipo_maquinas/${id}` : '/api/tipo_maquinas';

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ descricao: descricaoTipo }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Erro HTTP: ${response.status}`);
      }

      setSuccessMessage(isEditMode ? "Tipo de máquina atualizado com sucesso!" : "Tipo de máquina cadastrado com sucesso!");
      if (!isEditMode) {
        setDescricaoTipo('');
      }

    } catch (error) {
      console.error(`Erro ao ${isEditMode ? 'atualizar' : 'cadastrar'} tipo de máquina:`, error);
      setErrorMessage(`Falha ao ${isEditMode ? 'atualizar' : 'cadastrar'}: ${error.message}`);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ ml: 2 }}>Carregando dados do tipo de máquina...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h5" gutterBottom>
        {isEditMode ? `Editar Tipo de Máquina (ID: ${id})` : 'Cadastrar Novo Tipo de Máquina'}
      </Typography>

      <Paper sx={{ p: 3, mt: 3 }}>
        {successMessage && <Alert severity="success" sx={{ mb: 2 }}>{successMessage}</Alert>}
        {errorMessage && <Alert severity="error" sx={{ mb: 2 }}>{errorMessage}</Alert>}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Descricao do Tipo de Máquina"
            variant="outlined"
            value={descricaoTipo}
            onChange={(e) => setDescricaoTipo(e.target.value)}
            sx={{ mb: 2 }}
            required
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
            <Button
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate('/tipo_maquinas')}
            >
              Voltar
            </Button>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              startIcon={<SaveIcon />}
            >
              {isEditMode ? 'Salvar Alterações' : 'Salvar'}
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
}

export default TipoMaquinaFormPage;
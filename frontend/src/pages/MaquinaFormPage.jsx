import React, { useState, useEffect } from 'react';
import {
    Typography,
    Box,
    TextField,
    Button,
    Paper,
    Alert,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    CircularProgress,
    Switch,
    FormControlLabel,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useParams } from 'react-router-dom';

function MaquinaFormPage() {
    const [nome, setNome] = useState('');
    const [tipoMaquinaId, setTipoMaquinaId] = useState('');
    const [status, setStatus] = useState(true);
    const [dataUltimaAlteracaoStatus, setDataUltimaAlteracaoStatus] = useState(null);
    const [tiposMaquinaDisponiveis, setTiposMaquinaDisponiveis] = useState([]);
    const [loadingTipos, setLoadingTipos] = useState(true);
    const [loadingMaquina, setLoadingMaquina] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchAllData = async () => {
            setLoadingTipos(true);
            try {
                const responseTipos = await fetch('/api/tipo_maquinas');
                if (!responseTipos.ok) {
                    throw new Error(`Erro HTTP ao carregar tipos: ${responseTipos.status}`);
                }
                const dataTipos = await responseTipos.json();
                setTiposMaquinaDisponiveis(dataTipos);
            } catch (error) {
                console.error("Erro ao carregar tipos de máquina para o formulário:", error);
                setErrorMessage("Não foi possível carregar os tipos de máquina. Tente novamente.");
            } finally {
                setLoadingTipos(false);
            }

            if (id) {
                setIsEditMode(true);
                setLoadingMaquina(true);
                try {
                    const responseMaquina = await fetch(`/api/maquinas/${id}`);
                    if (!responseMaquina.ok) {
                        const errorText = await responseMaquina.text();
                        throw new Error(`Erro HTTP ao carregar máquina: ${responseMaquina.status} - ${errorText}`);
                    }
                    const dataMaquina = await responseMaquina.json();
                    setNome(dataMaquina.nome);
                    setTipoMaquinaId(dataMaquina.tipo_maquina_id);
                    setStatus(dataMaquina.status);
                    setDataUltimaAlteracaoStatus(dataMaquina.data_ultima_alteracao_status);
                } catch (err) {
                    console.error("Erro ao carregar máquina para edição:", err);
                    setErrorMessage("Falha ao carregar dados da máquina para edição.");
                } finally {
                    setLoadingMaquina(false);
                }
            } else {
                setIsEditMode(false);

                setNome('');
                setTipoMaquinaId('');
                setStatus(true);
                setDataUltimaAlteracaoStatus(null);
            }
        };

        fetchAllData();
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSuccessMessage(null);
        setErrorMessage(null);

        if (!nome.trim() || !tipoMaquinaId) {
            setErrorMessage("Por favor, preencha todos os campos obrigatórios.");
            return;
        }

        try {
            const method = isEditMode ? 'PUT' : 'POST';
            const url = isEditMode ? `/api/maquinas/${id}` : '/api/maquinas';

            const payload = {
                nome: nome,
                tipo_maquina_id: parseInt(tipoMaquinaId),
                status: status
            };

            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `Erro HTTP: ${response.status}`);
            }

            setSuccessMessage(isEditMode ? "Máquina atualizada com sucesso!" : "Máquina cadastrada com sucesso!");
            if (!isEditMode) {
                setNome('');
                setTipoMaquinaId('');
                setStatus(true);
                setDataUltimaAlteracaoStatus(null);
            }

        } catch (error) {
            console.error(`Erro ao ${isEditMode ? 'atualizar' : 'cadastrar'} máquina:`, error);
            setErrorMessage(`Falha ao ${isEditMode ? 'atualizar' : 'cadastrar'}: ${error.message}`);
        }
    };

    if (loadingTipos || loadingMaquina) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <CircularProgress />
                <Typography variant="h6" sx={{ ml: 2 }}>Carregando dados da máquina e tipos disponíveis...</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ mt: 2 }}>
            <Typography variant="h5" gutterBottom>
                {isEditMode ? `Editar Máquina (ID: ${id})` : 'Cadastrar Nova Máquina'}
            </Typography>

            <Paper sx={{ p: 3, mt: 3 }}>
                {successMessage && <Alert severity="success" sx={{ mb: 2 }}>{successMessage}</Alert>}
                {errorMessage && <Alert severity="error" sx={{ mb: 2 }}>{errorMessage}</Alert>}

                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Nome da Máquina"
                        variant="outlined"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        sx={{ mb: 2 }}
                        required
                    />

                    <FormControl fullWidth sx={{ mb: 2 }} required>
                        <InputLabel id="tipo-maquina-select-label">Tipo de Máquina</InputLabel>
                        <Select
                            labelId="tipo-maquina-select-label"
                            id="tipo-maquina-select"
                            value={tipoMaquinaId}
                            label="Tipo de Máquina"
                            onChange={(e) => setTipoMaquinaId(e.target.value)}
                        >
                            <MenuItem value="">
                                <em>Selecione um Tipo</em>
                            </MenuItem>
                            {tiposMaquinaDisponiveis.map((tipo) => (
                                <MenuItem key={tipo.id} value={tipo.id}>
                                    {tipo.descricao}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {isEditMode && (
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={status}
                                    onChange={(e) => setStatus(e.target.checked)}
                                    name="status-maquina"
                                    color="primary"
                                />
                            }
                            label={status ? "Máquina Ativa" : "Máquina Inativa"}
                            sx={{ mb: 2 }}
                        />
                    )}

                    {isEditMode && dataUltimaAlteracaoStatus && (
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            Última Alteração de Status: {new Date(dataUltimaAlteracaoStatus).toLocaleString()}
                        </Typography>
                    )}


                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                        <Button
                            variant="outlined"
                            startIcon={<ArrowBackIcon />}
                            onClick={() => navigate('/maquinas')}
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

export default MaquinaFormPage;
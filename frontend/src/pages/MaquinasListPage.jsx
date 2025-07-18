import React, { useState, useEffect } from 'react';
import {
    Typography,
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    CircularProgress,
    Alert,
    Button,
    Switch,
    FormControlLabel,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

function MaquinasListPage() {
    const [maquinas, setMaquinas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [maquinaToDelete, setMaquinaToDelete] = useState(null);
    const [deleteError, setDeleteError] = useState(null);

    const fetchMaquinas = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('/api/maquinas');

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Erro HTTP: ${response.status} - ${errorText}`);
            }
            const data = await response.json();
            setMaquinas(data);
        } catch (err) {
            console.error("Erro ao buscar máquinas:", err);
            setError("Falha ao carregar máquinas. Verifique a conexão com o backend.");
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteClick = (maquina) => {
        setMaquinaToDelete(maquina);
        setOpenDeleteDialog(true);
        setDeleteError(null);
    };

    const handleCloseDeleteDialog = () => {
        setOpenDeleteDialog(false);
        setMaquinaToDelete(null);
        setDeleteError(null);
    };

    const handleConfirmDelete = async () => {
        if (!maquinaToDelete) return;

        try {
            const response = await fetch(`/api/maquinas/${maquinaToDelete.id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Erro HTTP: ${response.status} - ${errorText}`);
            }

            setMaquinas(prevMaquinas => prevMaquinas.filter(maquina => maquina.id !== maquinaToDelete.id));
            handleCloseDeleteDialog();
            alert(`Máquina "${maquinaToDelete.nome}" excluída com sucesso!`);
        } catch (err) {
            console.error("Erro ao excluir máquina:", err);
            setDeleteError(`Falha ao excluir: ${err.message}`);
        }
    };

    useEffect(() => {
        fetchMaquinas();
    }, []);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <CircularProgress />
                <Typography variant="h6" sx={{ ml: 2 }}>Carregando Máquinas...</Typography>
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ mt: 4 }}>
                <Alert severity="error">{error}</Alert>
            </Box>
        );
    }

    return (
        <Box sx={{ mt: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h5" gutterBottom>
                    Lista de Máquinas
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={() => navigate('/maquinas/novo')}
                >
                    Adicionar Máquina
                </Button>
            </Box>

            {maquinas.length === 0 ? (
                <Typography variant="body1">Nenhuma máquina encontrada.</Typography>
            ) : (
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="tabela de máquinas">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Nome</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Tipo</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Última Alteração</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Ações</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {maquinas.map((maquina) => (
                                <TableRow key={maquina.id}>
                                    <TableCell>{maquina.id}</TableCell>
                                    <TableCell>{maquina.nome}</TableCell>
                                    { }
                                    <TableCell>{maquina.tipo}</TableCell>
                                    <TableCell>
                                        <FormControlLabel
                                            control={
                                                <Switch
                                                    checked={maquina.status}
                                                    name={`status-switch-${maquina.id}`}
                                                    color="primary"
                                                />
                                            }
                                            label={maquina.status ? "Ativo" : "Inativo"}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        {maquina.ultima_alteracao
                                            ? new Date(maquina.ultima_alteracao).toLocaleString()
                                            : 'N/A'}
                                    </TableCell>
                                    <TableCell>
                                        { }
                                        <Button
                                            size="small"
                                            variant="outlined"
                                            sx={{ mr: 1 }}
                                            onClick={() => navigate(`/maquinas/editar/${maquina.id}`)}
                                        >
                                            Editar
                                        </Button>
                                        <Button
                                            size="small"
                                            variant="outlined"
                                            color="error"
                                            onClick={() => handleDeleteClick(maquina)}
                                        >
                                            Excluir
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
            
            <Dialog
                open={openDeleteDialog}
                onClose={handleCloseDeleteDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Confirmar Exclusão"}
                </DialogTitle>
                <DialogContent>
                    {deleteError && <Alert severity="error" sx={{ mb: 2 }}>{deleteError}</Alert>}
                    <DialogContentText id="alert-dialog-description">
                        Você tem certeza que deseja excluir a máquina "{maquinaToDelete?.nome}" (ID: {maquinaToDelete?.id})?
                        Esta ação é irreversível.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeleteDialog} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={handleConfirmDelete} color="error" autoFocus>
                        Excluir
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default MaquinasListPage;
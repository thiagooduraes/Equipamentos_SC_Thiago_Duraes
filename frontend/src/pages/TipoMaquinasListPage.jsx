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
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

function TipoMaquinasListPage() {
    const [tipoMaquinas, setTipoMaquinas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [tipoToDelete, setTipoToDelete] = useState(null);
    const [deleteError, setDeleteError] = useState(null);

    const fetchTipoMaquinas = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('/api/tipo_maquinas');

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Erro HTTP: ${response.status} - ${errorText}`);
            }
            const data = await response.json();
            setTipoMaquinas(data);
        } catch (err) {
            console.error("Erro ao buscar tipos de máquinas:", err);
            setError("Falha ao carregar tipos de máquinas. Verifique a conexão com o backend.");
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteClick = (tipo) => {
        setTipoToDelete(tipo);
        setOpenDeleteDialog(true);
        setDeleteError(null);
    };

    const handleCloseDeleteDialog = () => {
        setOpenDeleteDialog(false);
        setTipoToDelete(null);
        setDeleteError(null);
    };

    const handleConfirmDelete = async () => {
        if (!tipoToDelete) return;

        try {
            const response = await fetch(`/api/tipo_maquinas/${tipoToDelete.id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Erro HTTP: ${response.status} - ${errorText}`);
            }

            setTipoMaquinas(prevTipos => prevTipos.filter(tipo => tipo.id !== tipoToDelete.id));
            handleCloseDeleteDialog();
            alert(`Tipo de Máquina "${tipoToDelete.descricao}" excluído com sucesso!`);
        } catch (err) {
            console.error("Erro ao excluir tipo de máquina:", err);
            setDeleteError(`Falha ao excluir: ${err.message}. Certifique-se de que não há máquinas associadas.`);
        }
    };

    useEffect(() => {
        fetchTipoMaquinas();
    }, []);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <CircularProgress />
                <Typography variant="h6" sx={{ ml: 2 }}>Carregando Tipos de Máquinas...</Typography> { }
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
                    Lista de Tipos de Máquinas { }
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={() => navigate('/tipo_maquinas/novo')}
                >
                    Adicionar Tipo
                </Button>
            </Box>

            {tipoMaquinas.length === 0 ? (
                <Typography variant="body1">Nenhum tipo de máquina encontrado.</Typography>
            ) : (
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 400 }} aria-label="tabela de tipos de máquinas">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Nome do Tipo</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Ações</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tipoMaquinas.map((tipo) => (
                                <TableRow key={tipo.id}>
                                    <TableCell>{tipo.id}</TableCell>
                                    <TableCell>{tipo.descricao}</TableCell>
                                    <TableCell>
                                        <Button
                                            size="small"
                                            variant="outlined"
                                            sx={{ mr: 1 }}
                                            onClick={() => navigate(`/tipo_maquinas/editar/${tipo.id}`)}
                                        >
                                            Editar
                                        </Button>
                                        <Button
                                            size="small"
                                            variant="outlined"
                                            color="error"
                                            onClick={() => handleDeleteClick(tipo)}
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
                        Você tem certeza que deseja excluir o tipo de máquina "{tipoToDelete?.descricao}" (ID: {tipoToDelete?.id})?
                        Esta ação é irreversível e só será possível se não houver máquinas associadas a este tipo.
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
        </Box >
    );
}

export default TipoMaquinasListPage;
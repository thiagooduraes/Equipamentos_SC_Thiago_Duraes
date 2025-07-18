import { Routes, Route, Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import HomePage from './pages/HomePage';
import TipoMaquinasListPage from './pages/TipoMaquinasListPage';
import MaquinasListPage from './pages/MaquinasListPage';
import TipoMaquinaFormPage from './pages/TipoMaquinaFormPage';
import MaquinaFormPage from './pages/MaquinaFormPage';

function App() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Lerdo Equipamentos
          </Typography>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/maquinas">
            Máquinas
          </Button>
          <Button color="inherit" component={Link} to="/tipo_maquinas">
            Tipos de Máquina
          </Button>
        </Toolbar>
      </AppBar>

      <Box sx={{ p: 3 }}> { }
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tipo_maquinas" element={<TipoMaquinasListPage />} />
          <Route path="/tipo_maquinas/novo" element={<TipoMaquinaFormPage />} />
          <Route path="/tipo_maquinas/editar/:id" element={<TipoMaquinaFormPage />} />
          <Route path="/maquinas" element={<MaquinasListPage />} />
          <Route path="/maquinas/novo" element={<MaquinaFormPage />} />
          <Route path="/maquinas/editar/:id" element={<MaquinaFormPage />} />
          { }
        </Routes>
      </Box>
    </Box>
  );
}

export default App;
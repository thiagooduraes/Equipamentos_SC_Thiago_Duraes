import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function HomePage() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Bem-vindo ao Sistema da Lerdo Equipamentos
      </Typography>
      <Typography variant="body1">
        Utilize a navegação acima para acessar as listas de máquinas e tipos de máquina.
      </Typography>
    </Box>
  );
}

export default HomePage;
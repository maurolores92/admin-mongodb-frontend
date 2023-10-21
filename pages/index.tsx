import Link from 'next/link';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Resumen from '../components/Resumen';

function Dashboard() {
  return (
    <>    
        <Box sx={{ display: 'flex', justifyContent:'center', margin: '3rem auto' }}>
          <Link href="/ingresos" passHref>
            <Button variant="contained" color="primary" sx={{ marginRight: 2 }}>
              Ingresos
            </Button>
          </Link>
          <Link href="/gastos" passHref>
            <Button variant="contained" color="secondary">
              Gastos
            </Button>
          </Link>
        </Box>
    <Resumen/>
    </>

  );
}

export default Dashboard;

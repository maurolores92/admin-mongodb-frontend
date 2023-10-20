import Link from 'next/link';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Box>
        <Link href="/ingresos">
          <Button variant="contained" color="primary" fullWidth>
            Ingresos
          </Button>
        </Link>
      </Box>
      <Box mt={2}>
        <Link href="/gastos">
          <Button variant="contained" color="secondary" fullWidth>
            Gastos
          </Button>
        </Link>
      </Box>
    </div>
  );
}

export default Dashboard;

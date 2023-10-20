import { useEffect, useCallback, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button, TextField, CardHeader, CardContent, Divider, Card } from '@mui/material';
import { Box } from '@mui/material';


interface Gasto {
  id: number;
  nameCost: string;
  amount: number;
  createDate: string;
  createdAt: string
}

function Gastos() {
  const [gastos, setGastos] = useState<Gasto[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [newGasto, setNewGasto] = useState({
    nameCost: '',
    amount: 0,
  });

  const getGastos = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:3001/gastos');
      if (response.ok) {
        const data = await response.json();
        setGastos(data);
      } else {
        console.error('Error al obtener gastos:', response.statusText);
      }
    } catch (error) {
      console.error('Error al obtener gastos:', error);
    }
  }, []);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/gastos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newGasto),
      });
  
      if (response.ok) {
        getGastos();
        setNewGasto({ nameCost: '', amount: 0 });
        setShowForm(false);
      } else {
        console.error('Error al agregar gasto:', response.statusText);
      }
    } catch (error) {
      console.error('Error al agregar gasto:', error);
    }
  };
  

  useEffect(() => {
    getGastos();
  }, [getGastos]);

const totalAmount = gastos.reduce((total, gasto) => total + gasto.amount, 0);

  return (
    <>
     <Paper elevation={3} sx={{ padding: '1rem', margin:'3rem auto' , maxWidth:'500px' }}>
  {showForm ? (
    <form onSubmit={handleFormSubmit}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <TextField
          label="Nombre del Gasto"
          variant="outlined" // Agregar un borde al campo
          value={newGasto.nameCost}
          onChange={(e) => setNewGasto({ ...newGasto, nameCost: e.target.value })}
        />
        <TextField
          label="Monto"
          variant="outlined"
          type="number"
          value={newGasto.amount}
          onChange={(e) => setNewGasto({ ...newGasto, amount: parseFloat(e.target.value) })}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Button type="submit" variant="contained" color="primary">
            Agregar Gasto
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setShowForm(false)}
          >
            Cerrar Formulario
          </Button>
        </Box>
      </Box>
    </form>
  ) : (
    <Button variant="contained" color="primary" onClick={() => setShowForm(true)}  sx={{margin:'0 auto', display:'flex'}}>
      Agregar Gasto
    </Button>
  )}
</Paper>

     <Card sx={{ margin: '3rem auto', maxWidth: '1000px' }}>
        <CardHeader title="Lista de Gastos" />
        <CardContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Nombre del Ingreso</TableCell>
                  <TableCell>Monto</TableCell>
                  <TableCell>Fecha de Creación</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {gastos.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.nameCost}</TableCell>
                    <TableCell>{item.amount}</TableCell>
                    <TableCell>{item.createdAt}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Divider sx={{ margin: '1rem 0' }} />
          <Typography variant="h6">
            Total: {totalAmount}
          </Typography>
        </CardContent>
      </Card>

      



    </>
  );
}

export default Gastos;

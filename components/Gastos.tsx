import { useEffect, useCallback, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button, TextField } from '@mui/material';

interface Gasto {
  id: number;
  nameCost: string;
  amount: number;
  createDate: string;
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
        // Recargar la lista de gastos después de agregar uno nuevo
        getGastos();
        // Restablecer el formulario
        setNewGasto({ nameCost: '', amount: 0 });
        // Ocultar el formulario
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

  return (
    <>
      <Typography variant="h4" sx={{marginBottom:'2rem'}}>Lista de Gastos</Typography>
      {showForm ? (
        <form onSubmit={handleFormSubmit}>
          <TextField
            label="Nombre del Gasto"
            value={newGasto.nameCost}
            onChange={(e) => setNewGasto({ ...newGasto, nameCost: e.target.value })}
          />
          <TextField
            label="Monto"
            value={newGasto.amount}
            onChange={(e) => setNewGasto({ ...newGasto, amount: parseFloat(e.target.value) })}
          />
          <Button type="submit" variant="contained" color="primary" sx={{marginTop:'2rem'}}>
            Agregar Gasto
          </Button>
        </form>
      ) : (
        <Button variant="contained" color="primary" onClick={() => setShowForm(true)} sx={{marginTop:'2rem'}}>
          Agregar Gasto
        </Button>
      )}


      <TableContainer component={Paper} sx={{marginTop:'3rem'}}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nombre del Gasto</TableCell>
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
                <TableCell>{item.createDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default Gastos;

import { useEffect, useCallback, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button, TextField, Card, CardContent, CardHeader, Divider, } from '@mui/material';
import { Box } from '@mui/material';


interface Ingreso {
  id: number;
  nameCost: string;
  amount: number;
  createDate: string;
  createdAt: string
}

function Ingresos() {
  const [ingresos, setIngresos] = useState<Ingreso[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [newIngreso, setNewIngreso] = useState({
    nameCost: '',
    amount: 0,
  });

  const getIngresos = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:3001/ingresos');
      if (response.ok) {
        const data = await response.json();
        setIngresos(data);
      } else {
        console.error('Error al obtener ingresos:', response.statusText);
      }
    } catch (error) {
      console.error('Error al obtener ingresos:', error);
    }
  }, []);

  useEffect(() => {
    getIngresos();
  }, [getIngresos]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/ingresos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newIngreso),
      });
  
      if (response.ok) {
        getIngresos();
        setNewIngreso({ nameCost: '', amount: 0 });
        setShowForm(false);
      } else {
        console.error('Error al agregar ingreso:', response.statusText);
      }
    } catch (error) {
      console.error('Error al agregar ingreso:', error);
    }
  };
  

const totalAmount = ingresos.reduce((total, ingreso) => total + ingreso.amount, 0);

  return (
    <>
           <Paper elevation={3} sx={{ padding: '1rem', margin:'3rem auto' , maxWidth:'500px' }}>
  {showForm ? (
    <form onSubmit={handleFormSubmit}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <TextField
          label="Nombre del Ingreso"
          variant="outlined" // Agregar un borde al campo
          value={newIngreso.nameCost}
          onChange={(e) => setNewIngreso({ ...newIngreso, nameCost: e.target.value })}
        />
        <TextField
          label="Monto"
          variant="outlined"
          type="number"
          value={newIngreso.amount}
          onChange={(e) => setNewIngreso({ ...newIngreso, amount: parseFloat(e.target.value) })}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Button type="submit" variant="contained" color="primary">
            Agregar Ingreso
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
    <Button variant="contained" color="primary" onClick={() => setShowForm(true)} sx={{margin:'0 auto', display:'flex'}}>
      Agregar Ingreso
    </Button>
  )}
</Paper>

<Card sx={{ margin: '3rem auto', maxWidth: '1000px' }}>
        <CardHeader title="Lista de Ingresos" />
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
                {ingresos.map((item) => (
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
          <Divider sx={{ margin: '1rem 0' }} />
          <Typography variant="h6">
            Total: {totalAmount}
          </Typography>
        </CardContent>
      </Card>




    </>
  );
}

export default Ingresos;

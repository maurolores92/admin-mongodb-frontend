import { useEffect, useCallback, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button, TextField, CardHeader, CardContent, Divider, Card, IconButton, } from '@mui/material';
import { Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';
import { Modal } from '@mui/material';

interface Gasto {
  id: number;
  nameCost: string;
  category: string;
  amount: number;
  createDate: string;
  createdAt: string
}

function Gastos() {
  const [gastos, setGastos] = useState<Gasto[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  useEffect(() => {
    getGastos();
  }, [getGastos]);

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

  const handleDelete = (itemId: number) => {
    console.log('Item ID a eliminar:', itemId);
    fetch(`http://localhost:3001/gastos/${itemId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          const updatedList = gastos.filter((item) => item.id !== itemId);
          setGastos(updatedList);
        } else {
          console.error('Error al eliminar el objeto:', response.statusText);
        }
      })
      .catch((error) => {
        console.error('Error al eliminar el objeto:', error);
      });
  };

  const filteredGastos = gastos.filter((gasto) =>
    gasto.nameCost.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalAmount = filteredGastos.reduce((total, gasto) => total + gasto.amount, 0);

  return (
    <>
    
  

<Card sx={{ margin: '3rem auto', maxWidth: '1000px' }}>
  <CardHeader/>

  <CardContent>
      <Link href="/">
          <IconButton>
            <ArrowBackIcon sx={{ fontSize: '2rem' }} />
          </IconButton>
    </Link>
            <Box sx={{display:'flex', justifyContent:'space-around', marginBottom:'1rem'}}>
              <Typography variant='h5'sx={{margin:'auto'}}> Lista de Gastos</Typography>
              <Box sx={{display:'flex'}}>
              <TextField
              sx={{margin:'0 1rem'}}
                label="Buscar Gasto"
                variant="outlined"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                
              />
              <Button
                variant="contained"
                color="primary"
                onClick={() => setIsModalOpen(true)}
                sx={{margin:'0 1rem'}}>
                Agregar Gasto
              </Button>
              </Box>
            </Box>
    <TableContainer>
      <Table>
      
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Nombre del Ingreso</TableCell>
            <TableCell>Categoria</TableCell>
            <TableCell>Monto</TableCell>
            <TableCell>Fecha de Creación</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredGastos.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.nameCost}</TableCell>
              <TableCell>{item.category}</TableCell>
              <TableCell>{item.amount.toLocaleString()}</TableCell>
              <TableCell>{item.createDate}</TableCell>
              <TableCell>
                <IconButton>
                  <EditIcon />
                </IconButton>
                <IconButton
                  onClick={() => handleDelete(item.id)}
                  color="error"
                  aria-label="delete"
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Divider sx={{ margin: '1rem 0' }} />
    <Box sx={{display:'flex', justifyContent:'space-between'}}>
    <Typography variant="h6">
      Total: {totalAmount.toLocaleString()}
    </Typography>
    <Button
                variant="contained"
                color="primary"
                onClick={() => setIsModalOpen(true)}
                sx={{margin:'0 1rem'}}>
                Agregar Gasto
              </Button>
            </Box>
  </CardContent>
</Card>

<Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'white',
            boxShadow: 24,
            p: 4,
          }}
        >
          <form onSubmit={(e) => {
            e.preventDefault();
            handleFormSubmit(e); 
            setIsModalOpen(false);
          }}>
            <TextField
              label="Nombre del Gasto"
              variant="outlined"
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
                onClick={() => setIsModalOpen(false)}
              >
                Cerrar Formulario
              </Button>
            </Box>
          </form>
        </Box>
    </Modal>

    </>
  );
}

export default Gastos;

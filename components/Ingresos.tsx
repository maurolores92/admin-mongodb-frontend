import { useEffect, useCallback, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button, TextField, Card, CardContent, CardHeader, Divider, IconButton, } from '@mui/material';
import { Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';
import { Modal } from '@mui/material';

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
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
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
  
  const handleDelete = (itemId: number) => {
    console.log('Item ID a eliminar:', itemId);
    fetch(`http://localhost:3001/ingresos/${itemId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          // Eliminar el objeto localmente
          const updatedList = ingresos.filter((item) => item.id !== itemId);
          setIngresos(updatedList);
        } else {
          console.error('Error al eliminar el objeto:', response.statusText);
        }
      })
      .catch((error) => {
        console.error('Error al eliminar el objeto:', error);
      });
  };

const totalAmount = ingresos.reduce((total, ingreso) => total + ingreso.amount, 0);

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
              <Typography variant='h5'sx={{margin:'auto'}}> Lista de Ingresos</Typography>
              <Box sx={{display:'flex'}}>
              <TextField
              sx={{margin:'0 1rem'}}
                label="Buscar Ingreso"
                variant="outlined"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                
              />
              <Button
                variant="contained"
                color="primary"
                onClick={() => setIsModalOpen(true)}
                sx={{margin:'0 1rem'}}>
                Agregar Ingreso
              </Button>
              </Box>
            </Box>
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Nombre del Ingreso</TableCell>
            <TableCell>Monto</TableCell>
            <TableCell>Fecha de Creación</TableCell>
            <TableCell>Acciones</TableCell> 
          </TableRow>
        </TableHead>
        <TableBody>
          {ingresos.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.nameCost}</TableCell>
              <TableCell>{item.amount.toLocaleString()}</TableCell>
              <TableCell>{item.createDate}</TableCell>
              <TableCell>
                <IconButton >
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
                Agregar Ingreso
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
  <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    <TextField
      label="Nombre del Ingreso"
      variant="outlined"
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
        onClick={() => setIsModalOpen(false)}>
        Cerrar
      </Button>
    </Box>
  </Box>
</form>

        </Box>
    </Modal>
    </>
  );
}

export default Ingresos;

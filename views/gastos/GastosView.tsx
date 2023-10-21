import React, { useCallback, useEffect, useState } from 'react';
import GastosTable from './GastosTable';
import { Box, Button, TextField } from '@mui/material';
import { Modal } from '@mui/material';


  function GastosView() {
    const [newGasto, setNewGasto] = useState({ nameCost: '', amount: 0 });
    const [gastos, setGastos] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
  
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

    const filteredGastos = gastos.filter((gasto) => {
        const lowerSearchTerm = searchTerm.toLowerCase();
        const name = gasto.nameCost.toLowerCase();
      
        return name.includes(lowerSearchTerm);
      });

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
          } else {
            console.error('Error al agregar gasto:', response.statusText);
          }
        } catch (error) {
          console.error('Error al agregar gasto:', error);
        }
      };

      const handleDelete = (itemId: number) => {
        // Lógica para eliminar el elemento
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
      

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', maxWidth:'1200px', margin:'3rem auto' }}>
        <Box>
        <Button
                variant="contained"
                color="primary"
                onClick={() => setIsModalOpen(true)}
                sx={{margin:'0 1rem'}}>
                Agregar Gasto
              </Button>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'end', marginBottom: '20px' }}>
          <TextField
            label="Buscar"
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Box>
      </Box>
      <GastosTable
        title="Lista de Gastos"
        gastosList={filteredGastos}
        onDeleteGasto={handleDelete}
        //onEditGasto={handleEdit}
      />

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
      setIsModalOpen(false); // Aquí se utiliza setIsModalOpen
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
          onClick={() => setIsModalOpen(false)} // Aquí también se utiliza setIsModalOpen
        >
          Cerrar Formulario
        </Button>
      </Box>
    </form>
  </Box>
</Modal>
    </>
  );
};

export default GastosView;
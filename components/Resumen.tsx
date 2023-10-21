import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';


interface Ingreso {
    id: number;
    amount: number;
  }
  
  interface Gasto {
    id: number;
    amount: number;
  }

function Resumen() {
    const [ingresos, setIngresos] = useState<Ingreso[]>([]); 
    const [gastos, setGastos] = useState<Gasto[]>([]);
    const totalIngresos = ingresos.reduce((total, ingreso) => total + ingreso.amount, 0);
    const totalGastos = gastos.reduce((total, gasto) => total + gasto.amount, 0);
    const totalRestante = totalIngresos - totalGastos;

    useEffect(() => {
        fetch('http://localhost:3001/ingresos') 
          .then((response) => response.json())
          .then((data: Ingreso[]) => setIngresos(data))
          .catch((error) => console.error('Error al cargar ingresos:', error));
    
        fetch('http://localhost:3001/gastos') 
          .then((response) => response.json())
          .then((data: Gasto[]) => setGastos(data))
          .catch((error) => console.error('Error al cargar gastos:', error));
      }, []); 
  
    return (
        <div>
        <TableContainer component={Paper} sx={{ maxWidth: 500, margin: '2rem auto' }}>
  <Table sx={{ minWidth: 400 }}>
    <TableHead>
      <TableRow>
        <TableCell align="left">Ingresos</TableCell>
        <TableCell align="left">{totalIngresos.toLocaleString()}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell align="left">Gastos Totales</TableCell>
        <TableCell align="left">{totalGastos.toLocaleString()}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell align="left">Total Restante</TableCell>
        <TableCell align="left">{totalRestante.toLocaleString()}</TableCell>
      </TableRow>
    </TableHead>
  </Table>
</TableContainer>
      </div>
    );
  }

export default Resumen;

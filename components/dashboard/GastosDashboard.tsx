import React, { useEffect, useState, useCallback } from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';

interface Gasto {
  id: number;
  nameCost: string;
  category: string;
  amount: number;
  createDate: string;
  createdAt: string;
}

function GastosDashboard() {
  const [gastos, setGastos] = useState<Gasto[]>([]);

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

  function preventDefault(event: React.MouseEvent) {
    event.preventDefault();
  }

  const last10Gastos = gastos.slice(-6);

  return (
    <React.Fragment>
      <Title>Ultimos Gastos</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
           {last10Gastos.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.nameCost}</TableCell>
              <TableCell>{item.category}</TableCell>
              <TableCell>{item.amount}</TableCell>
              <TableCell>{item.createDate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="/gastos" onClick={preventDefault} sx={{ mt: 3 }}>
        Ver mas
      </Link>
    </React.Fragment>
  );
}

export default GastosDashboard
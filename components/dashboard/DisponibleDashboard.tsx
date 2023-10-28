import * as React from 'react';
import { useEffect, useCallback, useState } from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}


interface Ingreso {
  id: number;
  amount: number;
}

interface Gasto {
  id: number;
  nameCost: string;
  category: string;
  amount: number;
  createDate: string;
  createdAt: string
}

function DisponibleDashboard() {
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
  
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const filteredGastos = gastos.filter((gasto) => {
    const gastoDate = new Date(gasto.createDate);
    const gastoYear = gastoDate.getFullYear();
    const gastoMonth = gastoDate.getMonth();

    return gastoYear === currentYear && gastoMonth === currentMonth;
  });

  const totalAmount = filteredGastos.reduce((total, gasto) => total + gasto.amount, 0);

  return (
    <React.Fragment>
      <Title>Total Disponible</Title>
      <Typography component="p" variant="h4">
        {totalRestante.toLocaleString()}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        on {currentDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
      </Typography>
      <div>
        <Link color="primary" href="/ingresos" onClick={preventDefault}>
          Ver Ingresos
        </Link>
      </div>
    </React.Fragment>
  );
}


export default DisponibleDashboard
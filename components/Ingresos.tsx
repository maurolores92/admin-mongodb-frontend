import { useEffect, useCallback, useState } from 'react';


interface Ingresos {
  id: number;
  nameCost: string;
  amount: number;
  createDate: string;
}



function Ingresos() {
  const [ingresos, setIngresos] = useState<Ingresos[]>([]);

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

  return (
    <div>
      <h1>Lista de Ingresos</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre del Ingresos</th>
            <th>Monto</th>
            <th>Fecha de Creación</th>
          </tr>
        </thead>
        <tbody>
          {ingresos.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.nameCost}</td>
              <td>{item.amount}</td>
              <td>{item.createDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Ingresos;

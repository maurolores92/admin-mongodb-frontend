import React from 'react';
import { GridColDef} from '@mui/x-data-grid';
import { Box, Button, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';

interface CustomButtonCellProps {
  slug: string;
}


const CustomTableCell = ({ value }: { value: any }) => {
  return (
    <Typography variant='body1' sx={{ color: 'text.primary' }}>
      {value}
    </Typography>
  );
};

const CustomButtonCell = ({ }: CustomButtonCellProps) => {
  const handleView = () => {
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Button
        variant='outlined'
        color='info'
        size='small'
        onClick={handleView}
        sx={{ mx: 1 }}
      >
        Detalles
      </Button>
    </Box>
  );
};

const CommonColumns: GridColDef[] = [
  {
    flex: 0.100,
    minWidth: 80,
    field: 'id',
    headerName: 'ID',
    renderCell: (params) => (
      <CustomTableCell value={params.value} />
    ),
  },
  {
    flex: 0.100,
    minWidth: 80,
    field: 'nameCost',
    headerName: 'Nombre',
    renderCell: (params) => (
      <CustomTableCell value={params.value} />
    ),
  },
  {
    flex: 0.100,
    minWidth: 80,
    field: 'category',
    headerName: 'Categoria',
    renderCell: (params) => (
      <CustomTableCell value={params.value} />
    ),
  },
  
  {
    flex: 0.100,
    minWidth: 80,
    field: 'amount',
    headerName: 'Monto',
    renderCell: (params) => (
      <CustomTableCell value={params.value} />
    ),
  },
  {
    flex: 0.150,
    minWidth: 150,
    headerName: 'Acciones',
    field: 'action',
    renderCell: (params) => (
      <CustomTableCell value={params.value} />
    ),
  },
];



export default CommonColumns;

import React from 'react';
import { Box, Card, CardHeader } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import CommonColumns from '../Columns';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

interface IngresosTableProps {
  title: string;
  ingresosList: any[];
  onDeleteGasto: (itemId: number) => void;
}

const IngresosTable = ({
  title,
  ingresosList,
  onDeleteGasto,
}: IngresosTableProps) => {
  const columns = CommonColumns.map((column) => {
    if (column.field === 'action') {
      return {
        ...column,
        renderCell: (params: any) => {
          return (
            <Box sx={{ display: 'flex' }}>
              <IconButton color='primary'>
                <EditIcon />
              </IconButton>
              <IconButton
                onClick={() => onDeleteGasto(params.row.id)}
                color='error'
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          );
        },
      };
    }
    return column;
  });

  return (
    <Card sx={{ maxWidth: '1200px', margin: '0 auto' }}>
      <CardHeader
        title={
          <Box display='flex' alignItems='center' justifyContent='space-between'>
            <span>{title}</span>
          </Box>
        }
      />
      <DataGrid autoHeight rows={ingresosList} rowCount={ingresosList.length} columns={columns} />
    </Card>
  );
};

export default IngresosTable;

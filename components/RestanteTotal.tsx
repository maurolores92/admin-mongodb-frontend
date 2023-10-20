import { Box, Card, CardContent, Grid, Typography } from '@mui/material';

interface ResumenFinancieroProps {
  ingresos: number;
  gastosTotales: number;
}

const RestanteTotal: React.FC<ResumenFinancieroProps> = ({ ingresos, gastosTotales }) => {
  const restante = ingresos - gastosTotales;

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Resumen Financiero
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Typography color="textSecondary">Ingresos:</Typography>
            <Typography variant="h5">{ingresos} $</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography color="textSecondary">Gastos Totales:</Typography>
            <Typography variant="h5">{gastosTotales} $</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography color="textSecondary">Restante:</Typography>
            <Typography variant="h5" color={restante >= 0 ? 'primary' : 'error'}>
              {restante} $
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default RestanteTotal;

import { Box, Container, Grid } from '@mui/material';
import PageLayout from '../components/PageLayout';
import DisponibleDashboard from '../components/dashboard/DisponibleDashboard';
import GastosDashboard from '../components/dashboard/GastosDashboard';
import Chart from '../components/dashboard/Chart';
import Paper from '@mui/material/Paper';

function Dashboard() {
  return (
    <PageLayout>    
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <Chart />
                </Paper>
              </Grid>
              {/* Recent Deposits */}
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <DisponibleDashboard />
                </Paper>
              </Grid>
              {/* Recent Orders */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <GastosDashboard />
                </Paper>
              </Grid>
            </Grid>
            
          </Container>
    </PageLayout>

  );
}

export default Dashboard;

import React from 'react';
import { Card, CardContent, Typography, Grid, Box } from '@mui/material';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend, Filler } from 'chart.js';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend, Filler);

const salesData = {
  labels: Array.from({ length: 100 }, (_, i) => (i + 1) + 'k'),
  datasets: [
    {
      label: 'Sales',
      data: [20, 30, 25, 40, 35, 60, 64, 50, 45, 55, 40, 30, 35, 50, 45, 60, 55, 40, 50, 45, 30, 35, 40, 55, 50,
             20, 30, 25, 40, 35, 60, 64, 50, 45, 55, 40, 30, 35, 50, 45, 60, 55, 40, 50, 45, 30, 35, 40, 55, 50,
             20, 30, 25, 40, 35, 60, 64, 50, 45, 55, 40, 30, 35, 50, 45, 60, 55, 40, 50, 45, 30, 35, 40, 55, 50,
             20, 30, 25, 40, 35, 60, 64, 50, 45, 55, 40, 30, 35, 50, 45, 60, 55, 40, 50, 45, 30, 35, 40, 55, 50],
      borderColor: '#1976d2',
      backgroundColor: 'rgba(25, 118, 210, 0.1)',
      fill: true,
      tension: 0.4,
    },
  ],
};

const revenueData = {
  labels: Array.from({ length: 100 }, (_, i) => (i + 1) + 'k'),
  datasets: [
    {
      label: 'Revenue 1',
      data: [40, 60, 50, 70, 60, 80, 70, 50, 60, 40, 30, 50, 60, 70, 50, 60, 40, 30, 50, 60, 70, 50, 60, 40, 30,
             40, 60, 50, 70, 60, 80, 70, 50, 60, 40, 30, 50, 60, 70, 50, 60, 40, 30, 50, 60, 70, 50, 60, 40, 30,
             40, 60, 50, 70, 60, 80, 70, 50, 60, 40, 30, 50, 60, 70, 50, 60, 40, 30, 50, 60, 70, 50, 60, 40, 30,
             40, 60, 50, 70, 60, 80, 70, 50, 60, 40, 30, 50, 60, 70, 50, 60, 40, 30, 50, 60, 70, 50, 60, 40, 30],
      backgroundColor: 'rgba(255, 112, 67, 0.5)',
      borderColor: 'rgba(255, 112, 67, 0.5)',
      fill: true,
      tension: 0.4,
    },
    {
      label: 'Revenue 2',
      data: [30, 50, 40, 60, 50, 70, 60, 40, 50, 30, 20, 40, 50, 60, 40, 50, 30, 20, 40, 50, 60, 40, 50, 30, 20,
             30, 50, 40, 60, 50, 70, 60, 40, 50, 30, 20, 40, 50, 60, 40, 50, 30, 20, 40, 50, 60, 40, 50, 30, 20,
             30, 50, 40, 60, 50, 70, 60, 40, 50, 30, 20, 40, 50, 60, 40, 50, 30, 20, 40, 50, 60, 40, 50, 30, 20,
             30, 50, 40, 60, 50, 70, 60, 40, 50, 30, 20, 40, 50, 60, 40, 50, 30, 20, 40, 50, 60, 40, 50, 30, 20],
      backgroundColor: 'rgba(186, 104, 200, 0.5)',
      borderColor: 'rgba(186, 104, 200, 0.5)',
      fill: true,
      tension: 0.4,
    },
  ],
};

function Home() {
  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={4} md={2.5}>
          <Card sx={{ backgroundColor: '#f5f5f5' }}>
            <CardContent>
              <Typography variant="h6">Active Users</Typography>
              <Typography variant="h4">40,680</Typography>
              <Typography color="green">8.5% Up from yesterday</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4} md={2.5}>
          <Card sx={{ backgroundColor: '#f5f5f5' }}>
            <CardContent>
              <Typography variant="h6">Total Buyers</Typography>
              <Typography variant="h4">10,293</Typography>
              <Typography color="green">1.3% Up from past week</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4} md={2.5}>
          <Card sx={{ backgroundColor: '#f5f5f5' }}>
            <CardContent>
              <Typography variant="h6">Total Sellers</Typography>
              <Typography variant="h4">2,040</Typography>
              <Typography color="green">1.8% Up from yesterday</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4} md={2.5}>
          <Card sx={{ backgroundColor: '#f5f5f5' }}>
            <CardContent>
              <Typography variant="h6">Total Sales</Typography>
              <Typography variant="h4">$89,000</Typography>
              <Typography color="red">4.3% Down from yesterday</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6">Sales Details</Typography>
          <Box sx={{ height: 300 }}>
            <Line
              data={salesData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                      callback: (value) => `${value}%`,
                    },
                  },
                },
              }}
            />
          </Box>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6">Revenue</Typography>
          <Box sx={{ height: 300 }}>
            <Line
              data={revenueData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                      callback: (value) => `${value}%`,
                    },
                  },
                },
              }}
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Home;
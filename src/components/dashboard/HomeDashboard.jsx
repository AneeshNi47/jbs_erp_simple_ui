import React from 'react';
import { Grid, Statistic } from 'semantic-ui-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Bar, Line, Pie } from 'react-chartjs-2';

// Register the components with Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard = () => {
  // Sample data for counters and charts
  const projectCount = 10;
  const totalLabourCost = 50000;
  const totalErrectionCost = 30000;
  const totalMiscCost = 10000;

  const barData = {
    labels: ['Project 1', 'Project 2', 'Project 3', 'Project 4', 'Project 5'],
    datasets: [
      {
        label: 'Cost',
        data: [12000, 15000, 8000, 14000, 10000],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const lineData = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Performance',
        data: [65, 59, 80, 81, 56],
        fill: false,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
      },
    ],
  };

  const pieData = {
    labels: ['Labour', 'Errection', 'Misc'],
    datasets: [
      {
        data: [50000, 30000, 10000],
        backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)'],
      },
    ],
  };

  return (
    <>
      <Grid>
        <Grid.Row columns={4}>
          <Grid.Column>
            <Statistic label="Projects" value={projectCount} />
          </Grid.Column>
          <Grid.Column>
            <Statistic label="Labour Cost" value={`$${totalLabourCost}`} />
          </Grid.Column>
          <Grid.Column>
            <Statistic label="Errection Cost" value={`$${totalErrectionCost}`} />
          </Grid.Column>
          <Grid.Column>
            <Statistic label="Misc Cost" value={`$${totalMiscCost}`} />
          </Grid.Column>
        </Grid.Row>

        <Grid.Row columns={4}>
          <Grid.Column>
            <Statistic label="Other 1" value={1000} />
          </Grid.Column>
          <Grid.Column>
            <Statistic label="Other 2" value={2000} />
          </Grid.Column>
          <Grid.Column>
            <Statistic label="Other 3" value={3000} />
          </Grid.Column>
          <Grid.Column>
            <Statistic label="Other 4" value={4000} />
          </Grid.Column>
        </Grid.Row>

        <Grid.Row columns={2}>
          <Grid.Column>
            <Bar data={barData} options={{ maintainAspectRatio: false }} />
          </Grid.Column>
          <Grid.Column>
            <Line data={lineData} options={{ maintainAspectRatio: false }} />
          </Grid.Column>
        </Grid.Row>

        <Grid.Row columns={2}>
          <Grid.Column>
            <Pie data={pieData} options={{ maintainAspectRatio: false }} />
          </Grid.Column>
          <Grid.Column>
            <Bar data={barData} options={{ maintainAspectRatio: false }} />
          </Grid.Column>
        </Grid.Row>

        <Grid.Row columns={2}>
          <Grid.Column>
            <Line data={lineData} options={{ maintainAspectRatio: false }} />
          </Grid.Column>
          <Grid.Column>
            <Pie data={pieData} options={{ maintainAspectRatio: false }} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
};

export default Dashboard;

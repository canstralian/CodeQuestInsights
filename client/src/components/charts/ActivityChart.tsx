import { useEffect, useRef } from 'react';
import { Chart, LineController, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';
import { CommitHistory } from '@shared/schema';

// Register the required components
Chart.register(LineController, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

interface ActivityChartProps {
  data: CommitHistory[];
}

export default function ActivityChart({ data }: ActivityChartProps) {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // Destroy previous chart instance if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    const chartData = {
      labels: data.map(item => item.month),
      datasets: [{
        label: 'Commits',
        data: data.map(item => item.count),
        backgroundColor: 'rgba(46, 164, 79, 0.2)',
        borderColor: 'rgba(46, 164, 79, 1)',
        borderWidth: 2,
        tension: 0.3
      }]
    };

    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: chartData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            mode: 'index',
            intersect: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(0, 0, 0, 0.05)'
            }
          },
          x: {
            grid: {
              display: false
            }
          }
        }
      }
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data]);

  return <canvas ref={chartRef} />;
}
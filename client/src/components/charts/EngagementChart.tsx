import { useEffect, useRef } from 'react';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, BarController } from 'chart.js';
import { GrowthMetric } from '@shared/schema';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, BarController);

interface EngagementChartProps {
  data: GrowthMetric[];
}

export default function EngagementChart({ data }: EngagementChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // Destroy previous chart instance if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    // Generate different shades of green
    const generateGreenShades = (count: number) => {
      const baseColor = 'rgba(46, 164, 79, ';
      return Array.from({ length: count }, (_, i) => {
        const opacity = 0.7 - (i * 0.1);
        return baseColor + (opacity > 0.3 ? opacity : 0.3) + ')';
      });
    };

    const backgroundColors = generateGreenShades(data.length);
    
    chartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: data.map(d => d.category),
        datasets: [{
          label: 'Growth',
          data: data.map(d => d.growthPercentage),
          backgroundColor: backgroundColors,
          borderColor: Array(data.length).fill('rgb(46, 164, 79)'),
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return `${context.parsed.y}% growth`;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(0, 0, 0, 0.05)'
            },
            ticks: {
              callback: function(value) {
                return value + '%';
              }
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

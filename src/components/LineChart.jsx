import React from 'react';
import { Line } from 'react-chartjs-2';
import { Col, Row, Typography } from 'antd';
import { Chart, registerables } from 'chart.js';
import 'chartjs-adapter-date-fns'; // Import the date adapter

const { Title } = Typography;
Chart.register(...registerables);

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  // Extracting coin price and timestamp from provided data
  const coinPrice = coinHistory?.data?.ohlc.map(entry => parseFloat(entry.close));
  const coinTimestamp = coinHistory?.data?.ohlc.map(entry => new Date(entry.startingAt * 1000).toLocaleDateString());

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: 'Price In USD',
        data: coinPrice,
        fill: false,
        backgroundColor: '#0071bd',
        borderColor: '#0071bd',
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: 'time',
        time: {
          parser: 'YYYY-MM-DD',
          tooltipFormat: 'll',
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <>
      <Row className="chart-header">
        <Title level={2} className="chart-title">{coinName} Price Chart</Title>
        <Col className="price-container">
          <Title level={5} className="price-change">Change: {coinHistory?.data?.open} %</Title>
          <Title level={5} className="current-price">Current {coinName} Price: $ {currentPrice}</Title>
        </Col>
      </Row>
      {/* Render the Line chart component with data and options */}
      <Line data={data} options={options} />
    </>
  );
};

export default LineChart;

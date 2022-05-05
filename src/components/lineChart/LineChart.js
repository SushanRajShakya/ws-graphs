import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useEffect, useState } from 'react';

import { LegendCard } from '../common';
import envConfig from '../../envConfig';
import socketConfig from '../../config/socket';
import { lineChartConfig } from '../../config';
import { notificationService } from '../../services';
import webSocketService from '../../services/webSocket';
import { socketNotification } from '../../constants/notifications';

import './lineChart.css';
import { legendLabels } from '../../constants/label';

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({ title }) => {
  const [socket, setSocket] = useState(null);
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);

  useEffect(() => {
    const socket = webSocketService.initiateSocket(
      envConfig.REACT_APP_SOCKET_URL
    );

    setSocket(socket);

    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.onmessage = (event) => {
        _handleData({
          data: JSON.parse(event.data),
          data1,
          setData1,
          data2,
          setData2,
        });
      };

      socket.onclose = (event) => {
        _handleSocketClose(event, setSocket);
      };

      socket.onerror = () => {
        socket.close();
      };
    }
  }, [socket, data1, data2]);

  return (
    <div className="chart-wrapper">
      <div className="chart-legend-wrapper">
        {_getTemperatureCard(data1, legendLabels.temp.ID_1)}
        {_getTemperatureCard(data2, legendLabels.temp.ID_2)}
      </div>
      <div className="chart">
        <span className="title">{title}</span>
        <Line
          options={lineChartConfig.options}
          data={{
            labels: _getChartLabels(data1, data2),
            datasets: _getChartData(data1, data2),
          }}
        />
      </div>
    </div>
  );
};

const _handleData = ({ data, data1, data2, setData1, setData2 }) => {
  console.log(data);
  data.forEach((item, index) => {
    if (item.data <= lineChartConfig.upperDataThreshold) {
      const currentDataSet = index === 0 ? data1 : data2;
      const newData = _sanitizeData([...currentDataSet, item]);

      index === 0 ? setData1(newData) : setData2(newData);
    }
  });
};

const _sanitizeData = (data) => {
  if (data.length > 1) {
    let breakpointIndex = 0;
    const latestData = data[data.length - 1];

    for (let i = 0; i < data.length; i++) {
      const timeDiffInMins =
        (latestData.timestamp - data[i].timestamp) /
        lineChartConfig.minInMilliseconds;

      if (timeDiffInMins < lineChartConfig.timeRange) {
        breakpointIndex = i;

        break;
      }
    }

    return data.slice(breakpointIndex);
  }

  return data;
};

const _handleSocketClose = (event, setSocket) => {
  event.wasClean
    ? notificationService.success(socketNotification.disconnected)
    : notificationService.error(socketNotification.error);

  if (!event.wasClean) {
    setTimeout(() => {
      setSocket(
        webSocketService.initiateSocket(envConfig.REACT_APP_SOCKET_URL)
      );
    }, socketConfig.RECONNECT_TIMEOUT);
  }
};

const _getChartLabels = (data1, data2) =>
  Array(data1.length > data2.length ? data1.length : data2.length)
    .join('.')
    .split('.');

const _getChartData = (data1, data2) => [
  {
    data: data1.map((item) => item.data),
    ...lineChartConfig.legendOptions.dataSet1,
  },
  {
    data: data2.map((item) => item.data),
    ...lineChartConfig.legendOptions.dataSet2,
  },
];

const _getTemperatureCard = (data, title, label) => (
  <>
    {!!data.length &&
      data
        .slice(-1)
        .map((item, index) => (
          <LegendCard
            key={index}
            title={title}
            label={'Temp'}
            data={`${item.temperature} C`}
          />
        ))}
  </>
);

export default LineChart;

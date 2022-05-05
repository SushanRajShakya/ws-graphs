import { Line } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
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

import envConfig from '../../envConfig';
import { GraphHistory } from '../common';
import webSocketService from '../../services/webSocket';

import './graph.css';
import { notificationService } from '../../services';
import { socketNotification } from '../../constants/notifications';

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
      labels: {
        usePointStyle: false,
        boxWidth: 10,
        boxHeight: 10,
        padding: 50,
      },
    },
  },
  scales: {
    y: {
      min: 0,
      max: 100,
      grid: {
        display: false,
      },
    },
    x: {
      grid: {
        display: false,
      },
    },
  },
};

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Graph = ({ title }) => {
  const [socket, setSocket] = useState(null);
  const [rawData, setRawData] = useState([]);
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
          rawData,
          setRawData,
          data1,
          setData1,
          data2,
          setData2,
        });
      };

      socket.onclose = (event) => {
        event.wasClean
          ? notificationService.success(socketNotification.disconnected)
          : notificationService.error(socketNotification.error);

        if (!event.wasClean) {
          setTimeout(() => {
            setSocket(
              webSocketService.initiateSocket(envConfig.REACT_APP_SOCKET_URL)
            );
          }, 2000);
        }
      };

      socket.onerror = () => {
        socket.close();
      };
    }
  }, [socket, rawData, data1, data2]);

  return (
    <div className="graph-wrapper">
      <div className="graph-history-wrapper">
        {!!rawData.length &&
          rawData
            .slice(-1)[0]
            .map((item, index) => (
              <GraphHistory
                key={index}
                title={`ID ${index + 1}`}
                label={'Temp'}
                data={`${item.temperature} C`}
              />
            ))}
      </div>
      <div className="graph">
        <span className="title">{title}</span>
        <Line
          options={options}
          data={{
            labels: Array(
              data1.length > data2.length ? data1.length : data2.length
            )
              .join('.')
              .split('.'),
            datasets: [
              {
                label: '1',
                data: data1,
                borderColor: 'rgb(231, 76, 60)',
                backgroundColor: 'rgb(231, 76, 60, 0.5)',
              },
              {
                label: '2',
                data: data2,
                borderColor: 'rgb(0, 35, 215)',
                backgroundColor: 'rgba(0 , 35, 215, 0.5)',
              },
            ],
          }}
        />
      </div>
    </div>
  );
};

const _handleData = ({
  data,
  rawData,
  data1,
  data2,
  setRawData,
  setData1,
  setData2,
}) => {
  setRawData([...rawData, data]);

  const valueData1 = data[0].data;
  const valueData2 = data[1].data;

  valueData1 <= 100 && setData1([...data1, valueData1]);
  valueData2 <= 100 && setData2([...data2, valueData2]);
};

export default Graph;

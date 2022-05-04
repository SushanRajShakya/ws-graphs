import _isEqual from 'lodash.isequal';
import { useEffect, useState } from 'react';

import envConfig from '../../envConfig';
import { GraphHistory } from '../common';
import webSocketService from '../../services/webSocket';

import './graph.css';

const Graph = ({ title }) => {
  const [data, setData] = useState([]);
  const [socket, setSocket] = useState(null);

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
        _handleData(event.data, data, setData);
      };
    }
  }, [socket, data]);

  return (
    <div className="graph-wrapper">
      <div className="graph-history-wrapper">
        {data.map((item) => (
          <GraphHistory
            title={`ID ${item.id}`}
            label={'Temp'}
            data={`${item.temperature} C`}
            key={item.id}
          />
        ))}
      </div>
      <div className="graph">
        <span className="title">{title}</span>
      </div>
    </div>
  );
};

const _handleData = (data, currentData, setData) => {
  let newData = JSON.parse(data);

  newData = newData.map((item, index) => {
    return item.data <= 100 ? item : currentData?.[index];
  });

  !_isEqual(newData, currentData) && setData(newData);
};

export default Graph;

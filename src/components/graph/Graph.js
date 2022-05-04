import { GraphHistory } from '../common';
import './graph.css';

const Graph = ({ title }) => {
  return (
    <div className="graph-wrapper">
      <div className="graph-history-wrapper">
        <GraphHistory title={`ID 1`} label={'Temp'} data={'12 C'} />
        <GraphHistory title={`ID 2`} label={'Temp'} data={'21 C'} />
      </div>
      <div className="graph">
        <span className="title">{title}</span>
      </div>
    </div>
  );
};

export default Graph;

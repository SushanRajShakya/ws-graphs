import PropTypes from 'prop-types';

import './graphHistory.css';

const GraphHistory = ({ title, label, data }) => {
  return (
    <div className="graph-history">
      <span className="title">{title}</span>
      <span className="detail">{`${label}: ${data}`}</span>
    </div>
  );
};

GraphHistory.propTypes = {
  title: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  data: PropTypes.string.isRequired,
};

export default GraphHistory;

import { ToastContainer } from 'react-toastify';

import { LineChart, Header } from './components';
import { CHART_TITLE, SUB_TITLE, TITLE } from './constants/label';

import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div>
      <Header title={TITLE} subTitle={SUB_TITLE} />
      <LineChart title={CHART_TITLE} />
      <ToastContainer />
    </div>
  );
};

export default App;

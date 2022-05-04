import { ToastContainer } from 'react-toastify';

import { Graph, Header } from './components';
import { GRAPH_TITLE, SUB_TITLE, TITLE } from './constants/label';

import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div>
      <Header title={TITLE} subTitle={SUB_TITLE} />
      <Graph title={GRAPH_TITLE} />
      <ToastContainer />
    </div>
  );
};

export default App;

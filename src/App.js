import { Graph, Header } from './components';
import { GRAPH_TITLE, SUB_TITLE, TITLE } from './constants/label';

const App = () => {
  return (
    <div>
      <Header title={TITLE} subTitle={SUB_TITLE} />
      <Graph title={GRAPH_TITLE} />
    </div>
  );
};

export default App;

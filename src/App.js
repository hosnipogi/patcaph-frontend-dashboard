import Layout from './components/Layout';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <Router basename="/dashboard">
      <Layout />
    </Router>
  );
}

export default App;

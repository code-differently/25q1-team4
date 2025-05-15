
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AddTreeScreen from './screens/AddTreeScreen';
import HistoryScreen from './screens/HistoryScreen';

const App: React.FC = () => {
  return (
    <Router>
      <nav>
        <Link to="/">Log Tree</Link>
        <Link to="/history">History</Link>
      </nav>
      <Routes>
        <Route path="/" element={<AddTreeScreen />} />
        <Route path="/history" element={<HistoryScreen />} />
      </Routes>
    </Router>
  );
};

export default App;

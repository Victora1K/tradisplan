import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
//import GoogleChart from './screens/GoogleChart';
import DDDSCreen from './screens/DDDSCreen';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import RecordScreen from './screens/RecordScreen';
import TestScreen from './screens/TestScreen';
import Player from './components/Player';
//import './App.css';

function App() {
  return (
    
    <Router>
      <Header />
      <Player />
      <Routes>
      <Route path="/" Component={DDDSCreen} />
      <Route path="/test" Component={TestScreen} />
        <Route path="/record" Component={RecordScreen} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

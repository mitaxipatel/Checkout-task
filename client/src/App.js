import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Checkout from './checkout';

function App() {
return(
  <BrowserRouter>
  <Routes>
    <Route path='/' element={<Checkout />} />
  </Routes>
  </BrowserRouter>
)
}

export default App;

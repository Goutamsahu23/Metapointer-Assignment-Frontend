
import './App.css';
import { Route, Routes } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import SendMoney from './components/SendMoney';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<SignIn/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/sendMoney' element={<SendMoney/>}/>

      </Routes>
    </div>
  );
}

export default App;

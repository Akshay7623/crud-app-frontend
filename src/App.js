import './App.css';
import { Routes, Route } from 'react-router-dom';
import CreateUsers from './Components/CreateUsers';
import NavBar from './Components/NavBar';
import AllUser from './Components/AllUser';
import SingleUser from './Components/SingleUser';

function App() {
  return (
    <div className='App'>
      <NavBar/>
      <Routes>
        <Route path='/' element={<CreateUsers></CreateUsers>} />
        <Route path='/alluser' element={<AllUser></AllUser>} />
        <Route path='/singleuser' element={<SingleUser></SingleUser>} />
      </Routes>
    </div>
  );
}

export default App;

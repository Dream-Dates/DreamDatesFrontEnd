import DateIdeas from './components/DateIdeas';
import Header from './pages/Header';
import SignUp from './pages/SignUp';
import './styles/styles.css'
import { Routes, Route } from 'react-router-dom'
import SignIn from './pages/SignIn';
import { useState } from 'react';

function App() {
  const [token, setToken] = useState()

  // if (!token) {
  //   return <SignIn setToken={setToken} />
  // }

  return (
    <div className="App">
      <Header />
      
      

      <Routes>
        <Route path='/' element={<DateIdeas />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/signin' element={<SignIn setToken={setToken}/>} />
      </Routes>
    </div>
  );
}

export default App;

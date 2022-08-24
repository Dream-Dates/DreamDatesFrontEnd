import DateIdeas from './components/DateIdeas';
import Header from './pages/Header';
import SignUp from './pages/SignUp';
import './styles/styles.css'
import { Routes, Route } from 'react-router-dom'
import SignIn from './pages/SignIn';
import { useState } from 'react';
import ContextProvider from "../src/context/contextProvider";
import { useEffect } from 'react';
import Saved from './pages/Saved';

function App() {
  const [user, setUser] = useState({
    'token': null,
    'id': null,
    'name': null
  })

  const [toggle, setToggle] = useState(true)

  const rerender = () => {
    setToggle(!toggle)
  }

  useEffect(() => {
    setUser({
      'token': localStorage.token,
      'id': localStorage.id,
      'name': localStorage.name
    })
  }, [toggle])

  const logUserOut = (e) => {

    setUser({
      'token': null,
      'id': null,
      'name': null
    })

    localStorage.removeItem('token')
    localStorage.removeItem('id')
    localStorage.removeItem('name')
  }

  return (
    <div className="App">
      <ContextProvider>
      <Header user={user} logUserOut={logUserOut}/>
      
      

      <Routes>
        <Route path='/' element={<DateIdeas userId={user.id}/>} />
        <Route path='/signup' element={<SignUp />} />
          <Route path='/signin' element={<SignIn rerender={rerender} />} />
          <Route path='/saved' element={<Saved />} />
      </Routes>
      </ContextProvider>
    </div>
  );
}

export default App;

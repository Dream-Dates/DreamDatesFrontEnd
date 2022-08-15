import DateIdeas from './components/DateIdeas';
import Header from './pages/Header';
import SignUp from './pages/SignUp';
import './styles/styles.css'
import { Routes, Route } from 'react-router-dom'
import SignIn from './pages/SignIn';

function App() {
  return (
    <div className="App">
      <Header />
      
      

      <Routes>
        <Route path='/' element={<DateIdeas />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/signin' element={<SignIn />} />
      </Routes>
    </div>
  );
}

export default App;

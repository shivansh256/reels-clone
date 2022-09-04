import logo from './logo.svg';
import './App.css';
import Signup from './components/Signup';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Login from './components/Login';
import { AuthProvider } from './Context/AuthContext';
import Feed from './components/Feed';
import PrivateRoute from './components/PrivateRoute';
import Profile from './components/Profile';

function App() {
  return (
    <Router>
      <AuthProvider>
      <Routes>
        <Route exact path='/' element={<PrivateRoute><Feed/></PrivateRoute>} />
        <Route path='/Profile/:id' element={<PrivateRoute><Profile/></PrivateRoute>} />
        <Route exact path='/Login' element={<Login/>} />
        <Route exact path='/Signup' element={<Signup/>} />
      </Routes>
      </AuthProvider>
      
    </Router>
  );
}

export default App;

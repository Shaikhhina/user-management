import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import UserList from './components/UserList';
import UserDetail from './components/Home';
import NewUser from './components/NewUser';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <Header /> 
      <div className="mt-16"> 
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/userList" element={<UserList />} />
          <Route path="/userDetail" element={<UserDetail />} />
          <Route path="/newUser" element={<NewUser />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

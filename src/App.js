import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { createBrowserHistory } from "history";
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import Welcome from './pages/Welcome/Welcome';
import Error from './pages/Error/Error';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';

function App() {
  // Отримання історії браузера
  const customHistory = createBrowserHistory();
  // Отримання бази користувачів
  let usersTemp =localStorage.getItem('users');
  let usersData = JSON.parse(usersTemp)

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<SignIn history={customHistory} usersData={usersData}/>}></Route>
        <Route path='/welcome' element={<Welcome />}></Route>
        <Route path='/sign-up' element={<SignUp history={customHistory}/>}></Route>
        <Route path='/rogot-pasword' element={<ForgotPassword history={customHistory} usersData={usersData}/>}></Route>
        <Route path='*' element={<Error />}></Route>
      </Routes>
    </div>
  );
}

export default App;

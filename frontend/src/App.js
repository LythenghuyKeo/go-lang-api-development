import logo from './logo.svg';
import { useEffect, useState } from "react";
import './App.css';
import Cookies from 'js-cookie';
import Login from './component/login/login';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import HomePage from './component/application/home';
import ApplicationForm from './component/application/step';
import Register from './component/register/register';

function App() {
  var islogin=false;
  
    const cookie = Cookies.get("Authorization");
    console.log(cookie);
    if (cookie===""){
        islogin=false
    }else{
      islogin=true
    }
 
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Login}/>
        <Route path="/home" exact component={
         islogin? ApplicationForm:Login}/>
        <Route path="/register" exact component={Register}/>
      </Switch>
    </Router>
  );
}

export default App;

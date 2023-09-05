import logo from './logo.svg';
import { useEffect, useState } from "react";
import './App.css';
import Cookies from 'js-cookie';
import Login from './component/login/login';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';

import ApplicationForm from './component/application/home_page';
import Register from './component/register/register';
import programSelection from './component/application/programSelection';
import PersonalInfoAdd from './component/application/personalInfo';
import Document from './component/application/document';
import UserPage from './component/application/userPage';
import StatusScreen from './component/application/statusScreen';

function App() {
  var islogin=false;
  var [islogin,setIslogin]= useState(false);

    const cookie = Cookies.get("Authorization");
    console.log(cookie);
    useEffect(()=>{
      if(cookie===""){
        setIslogin(false);
      }else{
        setIslogin(true)
      }
    })
 
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Login}/>
        <Route path="/home" exact component={
         islogin? ApplicationForm:Login}/>
        <Route path="/register" exact component={Register}/>
        <Route path="/programselection"  exact component={
         islogin? programSelection:Login}/>
         <Route path="/personalinformation"  exact component={
         islogin? PersonalInfoAdd:Login}/>
          <Route path="/document"  exact component={
         islogin? Document:Login}/>
          <Route path="/user/:id"exact component={islogin?UserPage:Login} />
          <Route path="/mystatus"  exact component={
         islogin? StatusScreen:Login}/>
      </Switch>
    </Router>
  );
}

export default App;

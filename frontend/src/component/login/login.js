import { useState } from "react";
import axios from 'axios';
import {useHistory,Link} from 'react-router-dom';
import Cookies from 'js-cookie';
function Login(){
    const history = useHistory();
    
    const [email,setEmail] = useState('');
    const [password,setPassword]=useState('');
    const handleLogin = async(e)=>{
        e.preventDefault();
        try{
         const response = await fetch('http://localhost:8080/login',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({email,password})
         })
         const data = await response.json();
         if (data['Log in']){
            Cookies.set('Authorization',data['message'],{path:"/"})
            history.push('/home');
         }else{
            console.log(data['message'])
         }
        }catch(error){
            console.log(error)
        }
        

    };
    return (
        <div class="flex font-poppins">
            <div className="w-1/2 bg-based p-10 min-h-screen flex items-center justify-center">
                <p class="text-white text-center text-7xl font-bold font-inter animate-fade-in ">KIRIROM INSTITUTE OF TECHNOLOGY</p>
 
            </div>
            <div className="w-1/2 p-10">
                <h2 className="text-3xl font-bold mb-4 text-center justify-center">Log in</h2>
                <form onSubmit={handleLogin}>
                    <div class='mb-4 flex items-center' >
                        <label class='w-1/3 text-2xl font-medium mr-4' >Email :</label>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" placeholder="Enter your email" class='mt-1 p-2 w-full border rounded-xl focus:outline-none focus:ring focus:boder-based-300'></input>
                    </div>
                    <div class='mb-4 flex items-center'>
                        <label class='w-1/3 text-2xl font-medium mr-4'>Password    :</label>
                        <input value={password} onChange={(e) => setPassword(e.target.value)} required type="Password" id="Password" placeholder="Enter your password" class='mt-1 p-2 w-full border rounded-xl focus:outline-none focus:ring focus:boder-red-300'></input>
                    </div>
                    <div className="flex flex-col items-center justify-center items-center">
                        <button required type="submit" class='bg-based text-white px-4 py-2 rounded-2xl font-semibold font-inter mt-4'>
                            Log In
                        </button>
                    </div>
                </form>
                <p className="mt-4 text-center">
                    Doesn't have an account ? <Link to='/register' class='text-based font-extrabold' >Register</Link>
                </p>
            </div>
        </div>
    )
};
export default Login;
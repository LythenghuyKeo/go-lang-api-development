import {useState,ReactComponentElement} from 'react';
import {useForm} from '@mantine/hooks';
const Login = ()=>{
    return (
        <form>
            <h1>Please log in</h1>
            <label>Email : <input type="text"></input></label>

        </form>
    )
}
export default Login;
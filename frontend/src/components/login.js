
import axios from 'axios'
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import backendurl from './backend';

export default function Login() {
  let email=useRef();
  let password=useRef();
  const navigate=useNavigate();

  let NavSignup=()=>{
    navigate('/signup');
  }

  let UserLogin=async function(){
     let data={email:email.current.value,
               password:password.current.value,
               doctor:false}
      try{
        let res=await axios.post(`${backendurl}/user/login`,data);
        res=res.data;
        console.log(res.data)
        localStorage.setItem('token',res.data.token)
        navigate('/');
      }catch(error){
        alert("try again");
        navigate('/login');
      }
  }

  
  return (
    <div className='loginbox debug'>
          <br></br>
          <div>.Login</div>
          <br></br>
          <input className='LoginInput' ref={email} id='email' placeholder='email'></input>
          <input className='LoginInput ' ref={password} id='password' placeholder='password'></input>
          <br></br>
          <button className='LoginButton' onClick={UserLogin} >submit</button>
          <button className='SignUpButton' onClick={NavSignup} >signup</button>
          <br></br>

    </div>
  )
}
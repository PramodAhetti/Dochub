
import axios from 'axios'
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  let email=useRef();
  let password=useRef();
  let name=useRef();
  const navigate=useNavigate();



  let UserSignUp=async function(){
     let data={email:email.current.value,
               password:password.current.value,
               name:name.current.value
            }
      try{
        let res=await axios.post('https://geopost.onrender.com/user/new',data);
        res=res.data;
        console.log(res.data)
        localStorage.setItem('token',res.data.token)
        navigate('/');
      }catch(error){
        alert("try again");
        navigate('/signup');
      }
  }

  
  return (
    <div className='loginbox debug'>
          <br></br>
          <div>.SignUp</div>
          <br></br>
          <input className='LoginInput ' ref={name} id='name' placeholder='name'></input>
          <input className='LoginInput' ref={email} id='email' placeholder='email'></input>
          <input className='LoginInput ' ref={password} id='password' placeholder='password'></input>
          <br></br>
          <button className='LoginButton' onClick={UserSignUp} >submit</button>
          <br></br>

    </div>
  )
}
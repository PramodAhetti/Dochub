import axios from 'axios';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import backendurl from './backend';

export default function Login() {
  const email = useRef();
  const password = useRef();
  const navigate = useNavigate();
  const [doctorLogin, setDoctorLogin] = useState(false);

  const NavSignup = () => {
    navigate('/signup');
  };

  const UserLogin = async () => {
    const data = {
      email: email.current.value,
      password: password.current.value,
      doctor: doctorLogin,
    };

    try {
      const res = await axios.post(`${backendurl}/user/login`, data);
      console.log(res);
      const token = res.data.data.token;
      localStorage.setItem('token', token);
      navigate('/');
    } catch (error) {
      alert('Invalid email or password. Please try again.');
      navigate('/login');
    }
  };

  const handleRadioChange = (event) => {
    setDoctorLogin(event.target.value === 'doctor');
  };

  return (
    <div className="loginbox debug">
      <br />
      <div>Login</div>
      <br />
      <input className="LoginInput" ref={email} id="email" placeholder="Email" />
      <input className="LoginInput" ref={password} id="password" placeholder="Password" />
      <div>
        <input
          type="radio"
          id="user"
          name="loginType"
          value="user"
          checked={!doctorLogin}
          onChange={handleRadioChange}
        />
        <label className='LoginButton'  htmlFor="user">User</label>
        <input
          type="radio"
          id="doctor"
          name="loginType"
          value="doctor"
          checked={doctorLogin}
          onChange={handleRadioChange}
        />
        <label className='LoginButton' htmlFor="doctor">Doctor</label>
      </div>
      <br>
      </br>
       <button className="LoginButton" onClick={UserLogin}>Submit</button>
      <button className="SignUpButton" onClick={NavSignup}>Signup</button>
      <br></br>
    </div>
  );
}

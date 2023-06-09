import { useState } from "react";
import { Link } from "react-router-dom";
export default function RegisterPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  async function register(ev) {
      ev.preventDefault();
      
      const response = await fetch('https://urskin.onrender.com/register', {
          method: 'POST',
          body: JSON.stringify({ username, password }),
          headers: { 'content-type': 'application/json' },
      });


      if (response.status === 200) {
          alert(' registration sucessful ! welcome ');
      } else {
          alert(' registration failed ! please try another login');
      }
        }
    return (
        
        
        <form className="register" onSubmit={register}>
            <h1>REGISTER</h1>
            <input type="text" placeholder="username" value={username}
            onChange={ev=>setUsername(ev.target.value)}
            />
            <input type="password" placeholder="password"
                value={password}
            onChange={ev=>setPassword(ev.target.value)}
            />
            <button>Register</button> <br></br>
            <span>already have an account  ? login right now :</span>
            <Link to="/login"><button className="btns">login</button></Link>
        </form>
        
    )
}

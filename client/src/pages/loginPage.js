import { useContext, useState } from "react"
import { Link, Navigate } from "react-router-dom";
import {UserContext} from '../userContext'


    export default function LoginPage() {
        const [username, setUsername] = useState('');
        const [password, setPassword] = useState('');
        const [redirect, setRedirect] = useState(false);
        const { setUserInfo } = useContext(UserContext);
        async function login(ev) {
            ev.preventDefault();
            const response = await fetch('https://urskin.onrender.com/login', {
                method: 'POST',
                body: JSON.stringify({ username, password }),
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            });
            if (response.ok) {
                response.json().then(userInfo => {
                    setUserInfo(userInfo);
                    setRedirect(true);
                });
            } else {
                alert('wrong credentials');
            }
        }

        if (redirect) {
            return <Navigate to={'/'} />
        }
        return (
          
            <form className="login" onSubmit={login}>
                <h1>Login</h1>
                <input type="text"
                    placeholder="username"
                    value={username}
                    onChange={ev => setUsername(ev.target.value)} />
                <input type="password"
                    placeholder="password"
                    value={password}
                    onChange={ev => setPassword(ev.target.value)} />
                <button>Login</button> <br/>
                <div className="btnss">
                 <span>you don't have an account  ? sign up right now :</span>
                <Link to="/register"><button className="btns">register</button></Link>
                </div>
            </form>
           
        );
};

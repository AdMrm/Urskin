import {Link} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "../userContext";
import Search from "./search";

export default function Header() {
  const {setUserInfo,userInfo} = useContext(UserContext);
  useEffect(() => {
    fetch('http://localhost:4000/profile', {
       mode: 'no-cors',
      credentials: 'include',
    }).then(response => {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  function logout() {
    fetch('http://localhost:4000/logout', {
       mode: 'no-cors',
      credentials: 'include',
      method: 'POST',
       
    });
    setUserInfo(null);
  }

  const username = userInfo?.username;

  return (
    <header>
      <Link to="/" className="logo">Urskin</Link>
      

      
      <nav>
        <Search />
        <Link to="/about">about us </Link>
      
        
      
        
        {username && (
          <>
            <Link to="/create">Create new post</Link>
            <a className="logout" onClick={logout}>Logout ({username})</a>
          </>
        )}
        {!username && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
     
    </header>
  );
}

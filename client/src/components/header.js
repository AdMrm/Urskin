import {Link} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "../userContext";


export default function Header() {

const [isMenuOpen, setIsMenuOpen] = useState(false);


  const {setUserInfo,userInfo} = useContext(UserContext);
  useEffect(() => {
    fetch('http://localhost:4000/profile', {
      
      credentials: 'include',
    }).then(response => {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  function logout() {
    fetch('http://localhost:4000/logout', {
      
      credentials: 'include',
      method: 'POST',
       
    });
    setUserInfo(null);
  }



  const username = userInfo?.username;

  
 
 function toggleMenu() {
  setIsMenuOpen(prevState => !prevState);
}




  return (
    <header>
      <Link to="/" className="logo">Urskin</Link>
      

      
      <nav>
        <div  className={isMenuOpen ? 'navi open' : 'navi'}>
            <Link to="/search"> search </Link>
        <Link to="/about"> about </Link>
         
      </div>
        
      
        <div className="main">
        {username && (
          <>
            <Link to="/create"> Create new post </Link>
            <a className="logout" onClick={logout}> Logout ({username}) </a>
          </>
        )}
        {!username && (
          <>
            <Link to="/login">Login </Link> 
            <Link to="/register">Register </Link>
            </>
            
          )}
          <div id="icon" className={isMenuOpen ? 'icon bx-x' : 'icon'} onClick={toggleMenu}>
          <img   src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAACCUlEQVR4nO2UQWvUQBiGXw+2ihb6C7QqUlkQwWzbZHcmycxak4PY3UKqsJuJu9KV0hbaQ7WIpXgRBSnoL1B/gXoQT15EigriTQ960INH8VpbGZmStVXaZtYs7aH7wnPI5JvvIcN8AdppZztzpzbTdWt8unp7Ymo2iZtXxq5GhNU3okJ4MTDN/VrSyHH2zVVHPy5cuy4fP3gkXz57Ll88eSrv35iXau1f5mp1KSjfiveTvt+ZKBY2ZzV+Vs6PjslvX75KlZ9LS/Lhwr2/hHdnZldratxLEssoX3ATxRU6eEQQvpzUTBvClyPH6dE6bmGzkZDyxZCyz+ngiyHhgZZ0d2bS9ztD6nrqmFJBXU/rRqsEmaAjJOxNqy5XSNhr1RNJCYnrtOxG/5G7TqJY5NgxQdhKK8epSgpHE8WrcsIrgrB3acdJ9Yhooawl3Z2pG8Ze9c/+3zEq59nIecMUw6ctL8hkOvSlhL9KOUKymDUbvNWSC8rsZiTlvCsvWra8YNE1TLpeLEvGwGCi+JJ95nhI2S8dqZKsF2zEkDGwMmxZJ7SOu0L55ZDwD4Ly71tR6rN+FLPmpgxlzU+lrDWuJW1nJ7IHQDeAwwB6AZwC0A/ABJADQGNy8Vp/XNMb7+mOezSVLgA+gHMpUT1Ur6ZyEMAhACcB9MVfxwF4MY3mjWf1TtWoWrVH7T2wWfffmZ4s7nmbhVMAAAAASUVORK5CYII="></img>
          </div>
        </div>
        
      </nav>
     
    </header>
  );
}

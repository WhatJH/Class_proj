import React, { useState } from 'react';
import './Header.css';

const Header = ({ onOpenCalendar }) => {  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  const [user, setUser] = useState({
    id: '',
    password: ''
  });

  const auth = () => {
    if (isSignUp) {
      if (username && password) {
        setUser({ id: username, password: password });
        setIsSignUp(false);
        alert('Successfully Signed Up!');
      } else {
        alert('Please fill in all fields');
      }
    } else if (!isLoggedIn) {
      if (username === '' || password === '') {
        alert('Please fill in all fields');
      } else if (username === user.id && password === user.password) {
        setIsLoggedIn(true);
      } else {
        alert('Invalid username or password');
      }
    }
  };

  
  const logout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="Header">
        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            <li>
              <button onClick={onOpenCalendar} className="calendar-button">Calendar</button>  
            </li>
            <li>
              {isLoggedIn ? (
                <button onClick={logout}>Logout</button>
              ) : (
                <>
                  
                  {!isLoggedIn && <button onClick={() => setIsSignUp(!isSignUp)}>{isSignUp ? 'Cancel' : 'Sign Up'}</button>}
                </>
              )}
            </li>
          </ul>
        </nav>
        <div className={`logo ${isLoggedIn ? 'logo-login' : ''}`}>
          <span></span>
        </div>
        {isSignUp ? (
          <div className="signup-form">
            <input type="text" placeholder="Username" onChange={e => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
            <button onClick={auth} className='join-button'>Join</button>
            <button onClick={() => setIsSignUp(false)} className='Cancel-button'>Cancel</button>
          </div>
        ) : isLoggedIn ? (
          <div className="welcome-message">
            <span>{username}님, 환영합니다!</span>
          </div>
        ) : (
          <div className="login-form">
            <input type="text" placeholder="Username" onChange={e => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
            <button onClick={auth} className='login-button'>Login</button>
          </div>
        )}
    </div>
  );
};

export default Header;

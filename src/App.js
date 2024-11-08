import logo from './logo.svg';
import './App.css';
import {useState} from 'react';

function App() {
  const[user, setUser] = useState({});
  const[cardFace, setCardFace] = useState('user-card-front');
  const[homePage, setHomePage] = useState('mini-container-no-card');


  const setHuman = () => {
    setCardFace('user-card-front')
    setHomePage('mini-container-card')

    return fetch('https://randomuser.me/api/')
    .then(response => response.json())
    .then(data => setUser(data.results[0]))
    .catch(err => console.log(err))
  };

  const setToBack = () => {
    setCardFace('user-card-back')
  }

  const setToFront = () => {
    setCardFace('user-card-front')
  }

  return (
    <div className="App">
      <div className={homePage}>
        <h1>Random User Generator</h1>
        <button onClick = {() => setHuman()}>Generate Human</button>
      </div>

      {
        user.picture ? (
          cardFace == 'user-card-front' ?
          (
            <div className="user-card-front">
              <img className = "profile-picture" src = {user.picture.medium}></img>
              <h3>{user.name.first} {user.name.last}</h3>
              <p>{user.dob.age}-year old {user.gender}</p>
              <button onClick = {() => setToBack()}>Contact Me</button>

            </div>
          ):
          (
            <div className="user-card-back">
              <div className="image-container">
                <img onClick = {() => setToFront()} className = "left-arrow" src={`${process.env.PUBLIC_URL}/left-arrow.png`}></img>
              
              </div>

              <img className = "profile-picture" src = {user.picture.medium}></img>
              <h3>{user.name.first} {user.name.last}</h3>
              <p>{user.location.city}, {user.location.state}</p>
              <button>{user.email}</button>
              <button>{user.phone}</button>
            </div>
          )
          
        ) :
        (
          <div className="user-card">

          </div>
        )
      }
      
      


    </div>
  );
}

export default App;

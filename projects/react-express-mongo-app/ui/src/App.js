import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import './App.css';

//const apiUrl = `http://localhost:5000`;
const apiUrl = process.env.REACT_APP_BACKEND_SERVICE;

class App extends Component {
  state = {
    users: []
  };

  async createUser() {
    console.log("create user >> " + apiUrl + " : " + process.env.REACT_APP_BACKEND_SERVICE);
    await axios.post(apiUrl + '/user-create',{username: 'Muhammad Fayyaz'},{
      headers: { 'Content-Type': 'application/json'}
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
    this.loadUsers();
  }

  async loadUsers() {
    console.log("load user >> " + apiUrl + " : " + process.env.REACT_APP_BACKEND_SERVICE);
    const res = await axios.get(apiUrl + '/users');
    this.setState({
      users: res.data
    });
  }

  componentDidMount() {
    this.loadUsers();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <button onClick={() => this.createUser()}>Create User</button>
          <p>Users list:</p>
          <ul>
            {this.state.users.map(user => (
              <li key={user._id}>id: {user._id} username: {user.username} </li>
              
              
            ))}
          </ul>
        </header>
      </div>
    );
  }
}

export default App;

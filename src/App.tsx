import React from 'react';
import './App.scss';
import {UsersList, UserForm} from "./components";

function App() {
  return (
    <div className="App">
      <div className="App-header">
            <UsersList/>
            <UserForm/>
      </div>
    </div>
  );
}

export default App;

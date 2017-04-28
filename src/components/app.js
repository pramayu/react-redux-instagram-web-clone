import React, { Component } from 'react';
import Navbar from '../shared/navbar';
import MainPage from './main/index';

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <MainPage />
      </div>
    )
  }
}

export default App;

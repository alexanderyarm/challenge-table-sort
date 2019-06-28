import React, { Component } from 'react';
import './App.css';
import Table from './components/table/Table';
import tableData from './data';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-container">
          <Table tableData={tableData} />
        </div>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import './App.css';
import Button from './components/button';

const AppContext = React.createContext();

class AppProvider extends Component {
  state = {
    uploads: []
  };

  render() {
    return (<AppContext.Provider value={ {
      state: this.state,
      getUploads: () => {
        fetch('http://localhost:8000/listuploads')
          .then(res => res.json())
          .then((result) => {
            this.setState({
              uploads: result
            })
          }, (error) => {
            console.error('Unable to fetch uploads.');
          })
      }
    } }>
      { this.props.children }
    </AppContext.Provider>);
  }
}

class App extends Component {
  render() {
    return (
      <AppProvider>
        <div className="App">
          <Button>Hello!</Button>
        </div>
      </AppProvider>
    );
  }
}

export default App;

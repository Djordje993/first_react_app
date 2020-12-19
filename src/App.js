import React from 'react';
import './App.css';
import Cards from './components/Cards';
import AddCard from './components/AddCard';
import EditCard from './components/EditCard';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

class App extends React.Component {

  render(){
    return (
        <Router>
          <div className="App">
            <h1>CARD CREATOR</h1>
            <Route path='/' exact>
              <Redirect to="/cards" />
            </Route>
            <Route path='/cards' exact >
              <Cards></Cards>
            </Route>
            <Route path='/cards/add' component={AddCard}></Route>
            <Route path='/cards/:id/edit' component={EditCard}></Route>
          </div>
        </Router>
      
    );
  }
  
}

export default App;

import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import FormAddNumber from "./components/AddNumber";
import FormUpdateNumber from "./components/UpdateNumber";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" render={() => <Home />} />
          <Route path="/add-new-contact" render={() => <FormAddNumber />} />
          <Route path="/update-contact/:id" render={() => <FormUpdateNumber /> } />
         {/* <Route render={() => <NotFound/>} />*/}
        </Switch>
      </div>
    );
  }
}

export default App;

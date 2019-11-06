import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import "./App.css";

class App extends Component() {
  render() {
    return (
      <div className="App">
        <Switch>
          {/* <Route exact path="/" render={() => <Home />} />
          <Route path="/add-new-contact" render={() => <FormAddContact />} />
          <Route path="/update-contact/:id" render={() => <FormUpdateContact/> } />
         <Route render={() => <NotFound/>} />*/}
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);

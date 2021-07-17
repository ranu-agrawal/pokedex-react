import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./components/Home/Home.js";
import PokemonDetails from "./components/Pokemon/PokemonDetails.js";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/pokemon/:id" component={PokemonDetails} />
      </Switch>
    </Router>
  );
};
export default App;
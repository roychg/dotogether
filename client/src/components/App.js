import React from 'react';
import { Switch, Route } from 'react-router-dom'

import * as Handlers  from 'routes/handlers'
import Protected from "routes/others/Protected";
import NotFound  from 'routes/others/NotFound'

const App = props => {
  return (
    <Switch>
      <Route exact path="/" component={Handlers.Landing} />
      <Route exact path="/demo" component={Handlers.Demo} />
      <Protected exact path="/@:username/boards" home={true} component={Handlers.Home} />
      <Protected exact path="/b/:bid/:btitle" home={false} component={Handlers.Board} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default App;
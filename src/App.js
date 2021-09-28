// import logo from './logo.svg';
import './App.css';
import { Home } from './Components/Home';
import {EmissionData} from './Components/EmissionData';

 

import {BrowserRouter, Route, Switch} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Switch>
          <Route path='/' component ={Home} exact />
          <Route path='/emissiondata' component={EmissionData}/>
        </Switch>
       </div>
    </BrowserRouter>
  );
}

export default App;

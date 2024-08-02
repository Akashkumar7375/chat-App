import * as React from 'react';
import {BrowserRouter as Router,Route,Routes} from "react-router-dom"
import Login from './Auth/Login';
import Signup from './Auth/Signup';
import Dashborad from './UsreComponent/Dashborad';
import Messagebox from './UsreComponent/Messagebox';
import Emailverify from './Auth/Emailverify';
import Uploadimg from './Auth/Uploadimg';
import Editeprofile from './UsreComponent/Editeprofile';



function App() {
 


  return (
  <>
  
  <Router>
    <Routes>
      <Route path='/' element={<Login/>}></Route>
      <Route path='/signup' element={<Signup/>}></Route>
      <Route path='/dashborad' element={<Dashborad />}></Route>
      <Route path='/dashborad/:id' element={<Dashborad />}></Route>
      <Route path='/messagebox/:id' element={<Messagebox />}></Route>
      
      <Route path='/emailverify/:id' element={<Emailverify/>}></Route>
      <Route path='/uploadimg/:id' element={<Uploadimg/>}></Route>
      <Route path='/updateprofile' element={<Editeprofile/>}></Route>
    </Routes>
  </Router>
  

  </>
  );
}
export default App
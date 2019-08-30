import React from 'react';
import {BrowserRouter , Switch , Route } from 'react-router-dom'

function App() {
 
  return (
    <BrowserRouter>
    <div>
      {/* <Navigation></Navigation> */}
      <Switch>
        <Route exact path='/' component={Login} /> 
        <Route path='/commits' component={} />

      </Switch>
    </div>
    </BrowserRouter>
  );
}

function Login(){
  let client_id='dec3fba300a20cb5e1e1'
  //href={`https://github.com/login/oauth/authorize?client_id=${client_id}`}
  // const handleReq= () =>{
  //   fetch('/github/login' , { credentials: 'same-origin' })
  //   .then(res=>{
  //     console.log(res);
      
  //   })

  // }
  return(
    <div className="App">
      <a href={`https://github.com/login/oauth/authorize?client_id=${client_id}`} >Sign In with Github </a>
    </div>
  )
}




export default App;

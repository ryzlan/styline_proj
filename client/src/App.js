import React from 'react';
import {BrowserRouter , Switch , Route } from 'react-router-dom'

function App() {
 
  return (
    <BrowserRouter>
    <div>
      {/* <Navigation></Navigation> */}
      <Switch>
        <Route exact path='/' component={Login} /> 
      </Switch>
    </div>
    </BrowserRouter>
  );
}

function Login(){
  let client_id='dec3fba300a20cb5e1e1'

  const handleReq= () =>{
    let url = `https://github.com/login/oauth/authorize?client_id=${client_id}`
    fetch(url)
      .then(data =>{
        console.log(data);
      
      })
  }
  return(
    <div className="App">
      <button onClick={handleReq}>Sign In with Github </button>
    </div>
  )
}


export default App;

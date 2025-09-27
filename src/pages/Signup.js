import React from 'react';
import Header from "../components/Header";
import SignupSigninComponents from"../components/SignupSignin";



function Signup() {
 
  return(
  <div>
  <Header/>
  <div className='wrapper'>
    <SignupSigninComponents/>
  </div>
  </div>
  );
  
}

export default Signup;

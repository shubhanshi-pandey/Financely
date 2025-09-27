import React, { useState } from 'react'; 
import  style from "./style.css";
import Input from '../Input';
import Button from '../Button';
import { createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth,db} from '../../firebase';
import { doc, setDoc, getDoc } from "firebase/firestore";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function SignupSigninComponents() {
  const [name,setName]= useState("");
  const [email,setEmail]= useState("");
  const [password,setPassword]= useState("");
  const [confirmPassword,setConfrimPassword]= useState("");
  const [loginForm, setLoginForm]= useState(false);
  const [loading,setLoading]= useState(false);
  const navigate=useNavigate();


  function SignupUsingEmail() {
    setLoading(true);

    if(name!="" && email!="" && password!="" && confirmPassword!="") {
      if(password==confirmPassword){
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed up 
          const user = userCredential.user;
          toast.success("User Created!");
          setLoading(false);
          setName("");
          setEmail("");
          setPassword("");
          setConfrimPassword("");
          createDoc(user);
          navigate("/dashboard");
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(errorMessage);
          setLoading(false);
          // ..
        });
      }
      else{
        toast.error("Password and Confirm Password don't match!!");
        setLoading(false);
      }
      
    
    }
    else{
      toast.error("All Fields Are Mandatory!");
      setLoading(false);

    }

  }

  function LoginUsingEmail(){
    console.log("Email",email);
    console.log("Password",password);
    setLoading(true);
    if(email!="" && password!="") {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        toast.success("User Logged In!");
        console.log("user logged in",user)
        setLoading(false);
        navigate("/dashboard");
        // ...


         })
        .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setLoading(false);
        toast.error(errorMessage);
        });
    }
    else{
      toast.error("All Fields are Mandatory!");
      setLoading(false);
    }
    

  }

  async function createDoc(user){
    setLoading(true);
    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    const userData = await getDoc(userRef);

    if (!userData.exists()) {
    
        try{
          await setDoc(doc(db, "users", user.uid), {
              name: user.displayName ? user.displayName : name,
              email:user.email,
              photoURL: user.photoURL ? user.photoURL : " ",
              createdAt: new Date(),
            });
            toast.success("Doc created!");
            setLoading(false);
          }
        catch(e){
          toast.error(e.message);
          setLoading(false);
      }
    }
    else{
      toast.error("Doc already exists!");
      setLoading(false);
    }

   
  }

  function googleAuth(){
    const provider = new GoogleAuthProvider();
    setLoading(true);
    try{
      signInWithPopup(auth, provider)
  .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
    console.log("user>>>",user);
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    toast.error(errorMessage );
    setLoading(false);
    const email = error.customData.email;
    const credential = GoogleAuthProvider.credentialFromError(error);
  });

    }
    catch(e){
      toast.error(e.message);
    }
    
  }


  return (
    <>
    {loginForm? ( <div className='signup-wrapper'>
      <h2 className='title'>
        Login on <span style={{color:"var(--theme)"}}>Financely</span>
      </h2>
      <form>
        
        <Input 
        type="email"
        label={"Email"} 
        state={email} 
        setState={setEmail} 
        placeholder={"JohnDoe@gmail.com"}
        />
        <Input
        type="password"
        label={"Password"} 
        state={password} 
        setState={setPassword} 
        placeholder={"Example@123"}
        />
        <Button 
        disabled={loading}
        text={loading?"Loading...":"Login Using Email and Password"} 
        onClick={LoginUsingEmail}/>
        <p className='p-login'>or</p>
        <Button 
        onClick={googleAuth}
        disabled={loading}
        text={loading ?"Loading...":"Login Using Google"} 
        blue={true}/>
        <p 
        className='p-login' 
        style={{cursor:"pointer"}} 
        onClick={()=>setLoginForm(!loginForm)}>
        Or Don't Have an account already? Click here
        </p>
      </form>
    </div>):( <div className='signup-wrapper'>
      <h2 className='title'>
        Signup on <span style={{color:"var(--theme)"}}>Financely</span>
      </h2>
      <form>
        <Input 
        label={"Full Name"} 
        state={name} 
        setState={setName} 
        placeholder={"John Doe"}
        />
        <Input 
        type="email"
        label={"Email"} 
        state={email} 
        setState={setEmail} 
        placeholder={"JohnDoe@gmail.com"}
        />
        <Input
        type="password"
        label={"Password"} 
        state={password} 
        setState={setPassword} 
        placeholder={"Example@123"}
        />
        <Input 
        type="password"
        label={"confirm Password"} 
        state={confirmPassword} 
        setState={setConfrimPassword} 
        placeholder={"Example@123"}
        />
        <Button 
        disabled={loading}
        text={loading?"Loading...":"Signup Using Email and Password"} 
        onClick={SignupUsingEmail}/>
        <p className='p-login'>or</p>
        <Button 
        onClick={googleAuth}
        disabled={loading}
        text={loading ?"Loading...":"Signup Using Google"} 
        blue={true}/>
        <p 
        className='p-login' 
        style={{cursor:"pointer"}} 
        onClick={()=>setLoginForm(!loginForm)}>
        or Have an account already? Click here
        </p>
      </form>
    </div>)}
   
    </>
  )
}

export default SignupSigninComponents;
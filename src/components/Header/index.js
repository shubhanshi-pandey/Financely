import React, { useEffect } from 'react';
import "./styles.css";
import {auth} from "../../firebase";
import { signOut } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import userImg from '../../assets/user.svg';

function Header() {

  const [user, loading] = useAuthState(auth);
  const navigate=useNavigate();
  useEffect(() => {
    if(user){
      navigate("/dashboard");
   }
  }, [user,loading])
  
  function logoutfunc(){
    try{
      signOut(auth).then(() => {
      toast.success("Logged out successfully!");
      navigate("/");
      }).catch((error) => {
        toast.error(error.message);
      });
    }
    catch(e){
      toast.error(e.message);
      
    }
  
  }

  return (
    <div className='navbar'>
      <p className='logo'>Financely.</p>
      {user && (
      <div style={{display:"flex",alignItems:"center",gap:"0.75rem"}}>
        <img style={{width:"1.5rem",height:"1.5rem", borderRadius:"50%"}} 
        src={user.photoURL?user.photoURL:{userImg}}  />
      <p className='logo-link' onClick={logoutfunc}>
        Logout
        </p>
      </div>
      )}
      
      
    </div>
    
  );
}

export default Header;
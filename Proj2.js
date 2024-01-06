import "./Proj2.css";

import React, { useState,useCallback,useRef, useEffect} from 'react'



function Proj2() {
  const[length,setlength]=useState(0);
  const[numberAllowed,setNumberAllowed]=useState(false);
  const[charAllowed,setCharAllowed]=useState(false);
  const[password,setpassword]=useState();
  const passgen=useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed){
      str +="01234567789"
    }
    if(charAllowed){
      str+="!@#$%^&*?"
    }
    for (let i = 1; i <=length; i++) {
      let char= Math.floor(Math.random()*str.length+1)
      pass+=str.charAt(char)
      
    }
    setpassword(pass)

  },[length,numberAllowed,charAllowed,setpassword])
  const passref=useRef(null);
  const copypass= useCallback(()=>{
    passref.current?.select()
    window.navigator.clipboard.writeText(password)
  },[password])
  useEffect(()=>{ passgen()},[numberAllowed,charAllowed,length,passgen])
  return (
  <>
  <body>
  <div className="container">
    <h1>Create Password</h1>
  <div className="inp">
    <input type="text" value={password} placeholder="Password" readOnly
    ref={passref}
     />
      <button className="btn" onClick={copypass}>Copy</button>
  </div>
  <div className="ac">
    <div className="bc">
      <input type="range" min={6} max={30} value={length}
      onChange={(e)=>{setlength(e.target.value)}}/>
      <label htmlFor="">Length{length}</label>
    </div>
    <div className="">
      <input type="checkbox"  defaultChecked={numberAllowed} 
      onChange={()=>{
        setNumberAllowed((previousval)=> !previousval);
      }}/>
      <label htmlFor="">Number</label>
    </div>
    <input type="checkbox" defaultChecked={charAllowed}
    onChange={()=>{
      setCharAllowed((previousval)=> !previousval);
    }} />
    <label htmlFor="">Special</label>
    <button className="btn" onClick={()=>{
    passgen()
  }}>Generate</button>
  </div>
 
 
  
  </div>
    
  </body>
 
  </>
  )
}

export default Proj2;

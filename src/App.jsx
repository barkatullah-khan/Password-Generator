import { useState,useCallback,useEffect,useRef } from "react";

import "./App.css";

function App() {
 const [length,serLength]=useState(8);
 const [numberAllowed,setNumberAllowed]=useState(false)
 const [charAllowed,setCharAllowed]=useState(false)
 const[password,setPassword]=useState('')

 //useRef
 const passwordRef=useRef("");

 const passwordGenerator=useCallback(()=>{
  let pass=""
  let str="ABCDEFGIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
  if(numberAllowed) str += "0123456789"
  if(charAllowed) str += "!@#$%^&*_=[]{}~`"
  for(let i=1; i<=length;i++){
    let char=(Math.random() * str.length+1)
    pass+=str.charAt(char)
  }
  
   setPassword(pass)
 },[length,numberAllowed,charAllowed,setPassword]);
  const copyPasswordTOClipboard=useCallback(()=>{
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,20)
 window.navigator.clipboard.writeText(password)
  },[password])
 useEffect(()=>{
  passwordGenerator()
}
 ,[length,numberAllowed,charAllowed,passwordGenerator])
  return (
    <>
     <div className="  w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-700 ">
      <div className="w-full max-w-md mx-a shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700">
       <h2 className="text-white my-3"> password Generator</h2>
        <input type="text" value={password} 
        className=" outline-none w-full py-1 px-3"
        placeholder="password" 
        readOnly
        ref={passwordRef}/>
        <button onClick={copyPasswordTOClipboard} className="text-white cursor-pointer px-1 py-1 bg-blue-500 rounded-md my-2">Copy</button>
      </div>
      <div className="flex text-sm gap-x-1">
        <div className="flex items-center gap-x-1">
          <input type="range" min={6} max={100}
          value={length} className="cursor-pointer" onChange={(e)=>{serLength(e.target.value)}} />
          <label > length:</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input type="checkbox"
          defaultChecked={numberAllowed}
          id="numberInput"
          onChange={()=>{
            setNumberAllowed((prev)=>!prev)
          }} />
          <label htmlFor="numberInput">Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input type="checkbox"
          defaultChecked={numberAllowed}
          id="numberInput"
          onChange={()=>{
            setNumberAllowed((prev)=>!prev)
          }} />
          <label htmlFor="numberInput">charecters</label>
        </div>

      </div>
     </div>
    </>
  );
}

export default App;

import { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

import React from 'react'

function App() {
  const [img,setimg] = useState("");
  const [loading,setloading]=useState(false);
  const [values,setvalues]=useState("");
  const [link,setlink]=useState("");
  async function generateqr(){
    setloading(true);
    try{
const url = `https://api.qrserver.com/v1/create-qr-code/?size=${link}x${link}&data=${encodeURIComponent(values)}`;
setimg(url);
    }
    catch(error){
console.log("error")
    }
    finally{
      setloading(false);
    }
  }
  function downloadqr(){
    fetch(img).then((response)=>response.blob()).then((blob)=>{
      const anchor = document.createElement("a");
      anchor.href=URL.createObjectURL(blob);
      anchor.download= `${values}.png`;
      document.body.appendChild(anchor)
      anchor.click();
      document.body.removeChild(anchor);
    })
  }
  return (
    <div className='main-container'>
    <div className='container text-center d-flex flex-column align-middle'>
      <div className="row">
        <div className="col col-lg-12">
     <h4 className='text-light mt-4'>QR GENERATOR</h4>
     {loading && <p>Loading...</p>}
   {img &&   <img src={img} class="m-4 image-bg"/>}
     </div>
   <div class="text-center">
      <label for="name" className='d-block text-light'>for qr code</label>
     <input type='text' id='name' onChange={(e)=>{
setvalues(e.target.value);
     }} />
    
     
     <label for="download" className='d-block text-light'>size of the QR Ex:150</label>
     <input type="number" id='download' onChange={(e)=>{
setlink(e.target.value);
     }} />
     </div>
     </div>
     <div>
     <button className="btn btn-primary m-3" onClick={generateqr}>GENERATE QR</button>
     <button className="btn btn-dark m-3" onClick={downloadqr}>Download</button>
     </div>
     </div>
     </div>

  )
}

export default App

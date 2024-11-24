import './App.css';
import axios from "axios"
import {useState} from "react"
import serverUrl from "./server-url.js"

function App() {

  const [isLegit,setIsLegit] = useState(" ")
  const [batch,setBatch] = useState(" ")
  function handleChange(e){
    const file = e.target.files
    if (file.length === 0) {
      
    }else if (file.length === 1) {
      const formData = new FormData()
      formData.append("pdfFile",file[0])
  
      axios.post(serverUrl+"/check-fraud-pdf",formData,{
        headers: {
          "Content-Type": "multipart/form-data", // Ensure the correct content type
        },
      }).then((res)=>{
        setIsLegit(res.data)
      }).catch((err)=>{
        console.log(err);
        
      })
    }else if(file.length > 1){
      const formData = new FormData()

      for (let i = 0; i < file.length; i++) {
        formData.append("pdfFile",file[i])
      }

      axios.post(serverUrl+"/check-fraud-pdf-batch",formData,{
        headers: {
          "Content-Type": "multipart/form-data", // Ensure the correct content type
        },
      }).then((res)=>{
        setBatch(res.data)
      }).catch((err)=>{
        console.log(err);
        
      })
    }
  }
  return (
    <div className="App">
      <input type="file" onChange={handleChange} multiple></input>
      <h1>{isLegit === " " ? <></>:<>{isLegit ? <>true</>:<>false</>}</>}</h1>
      <h1>{batch === " " ? <></>:<>{batch ? <>Legit : {batch.legitDocs}<hr/> Fraud :{batch.fraudDocs}</>:<></>}</>}</h1>
    </div>
  );
}

export default App;

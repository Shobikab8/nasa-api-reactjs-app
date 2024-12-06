import Main from "./components/Main"
import Footer from "./components/Footer"
import SideBar from "./components/SideBar"
import { useState, useEffect } from "react"

function App() {
  
  const [data,setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  useEffect(()=>{
    async function fetchAPIData() {
      const NASA_KEY = import.meta.env.VITE_NASA_API_KEY
      const url = 'https://api.nasa.gov/planetary/apod' + `?api_key=${NASA_KEY}`

      const today = (new Date()).toDateString();
      const localKey = `NASA-${today}`;
      if(localStorage.getItem(localKey)){
        const apiData = JSON.parse(localStorage.getItem(localKey));
        setData(apiData);
        console.log("Fetched from cache today");
        return;
      }
      localStorage.clear();

      try{
        const response = await fetch(url);
        const apiData = await response.json();
        localStorage.setItem(localKey, JSON.stringify(apiData));
        setData(apiData);
        
        console.log("Fetched from API today");
      }
      catch(e){
        console.log(e.message);
      }
    }
    fetchAPIData()
  }, []);

  function handleToggleInfo(){
    setShowInfo(!showInfo);
  }

  return (
    <>
      {data ? (<Main data={data}/>): (
        <div className="loadingState">
          <i className="fa-solid fa-spinner"></i>
        </div>
      )}

      {showInfo && (
        <SideBar data={data} handleToggleInfo= {handleToggleInfo}/>
      )}
      
      {data && (<Footer data={data} handleToggleInfo= {handleToggleInfo}/>)}
    </>
  )
}

export default App

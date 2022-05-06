import { getDefaultNormalizer } from "@testing-library/react";
import React,{useState} from "react";
import { useEffect } from "react";
import Card from "./Card";
let API_key="&api_key=40618432ed320ddeb3be3b9989f2fc8e";
let base_url="https://api.themoviedb.org/3";
let url=base_url+"/discover/movie?sort_by=popularity.desc"+API_key;
let arr=["Popular","Theatre","Kids","Drama","Comedy"];
const Main=()=>{
    const [movieData,setData]=useState([]);
    const [url_set,setUrl]=useState(url);
    const [search,setSearch]=useState();
    useEffect(()=>{
        fetch(url_set).then(res=>res.json()).then(data=>{
            // console.log(data.results)
            setData(data.results);
        }).catch(err=>
            {
                console.log(err);
                setData([])
        });
    },[url_set])
    const getData=(movietype)=>{
      if(movietype=="Popular")
      {
        url=base_url+"/discover/movie?sort_by=popularity.desc"+API_key; 
      }  
      if(movietype=="Theatre"){
          url=base_url+"/discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22"+API_key;
      }
      if(movietype=="Kids"){
          url=base_url+"/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc"+API_key;
      }
      if(movietype=="Drama"){
          url=base_url+"/discover/movie?with_genres=18&primary_release_year=2014"+API_key;
      }
      if(movietype=="Comedy"){
          url=base_url+"/discover/movie?with_genres=35&with_cast=23659&sort_by=revenue.desc"+API_key;
      }
      setUrl(url);
    }
    const searchMovie=(evt)=>{
  
       if(evt.target.value){
           url=base_url+"/search/movie?api_key=40618432ed320ddeb3be3b9989f2fc8e&query="+evt.target.value;
           setUrl(url);
        //    setSearch("  ");
       }
       
       
    }
    return(
        <>
        <div className="header">
        <nav>
           <ul>
               {
                   arr.map((value,pos)=>{
                       return(
                        <li><a href="#" key={pos} name={value} onClick={(e)=>{getData(e.target.name)}}>{value}</a></li>
                       )
                   })
               }
               </ul>        
        </nav>
        <form>
            <div className="search-btn">
                <input type="text" placeholder="search your movie" className="inputText" onKeyPress={searchMovie}>
             </input>
             <button><i className="fas fa-search"></i></button>
            </div>
        </form>
        </div>
        <div className="container">
        {
            (movieData.length==0)?<p className="notfound">Not Found</p>: movieData.map((res,pos)=>{
                return(
                    <Card info={res} key={pos}/>
                )
            })
        }
        </div>
        </>
    )
}
export default Main;
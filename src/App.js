import './App.css';
import axios from'axios';
import md5 from 'md5'
import {useState, useEffect} from 'react';


function App() {

  const privateKey = '8d2aa4d750936b633acf8ff264e24ce352ef53b6';
  const publicKey = '0d507c7bf9198fff3e2581f6dbb50d5e'
  const ts = '1';
  const hash = md5(ts+privateKey+publicKey);
  
  const [page,setpage] = useState(0);
  let offset= page*100;
  const url = 'https://gateway.marvel.com:443/v1/public/comics?orderBy=title&limit=100&offset='+offset+'&ts='+ts+'&apikey='+publicKey+'&hash='+hash
 
  const [comics, setComics] =useState([])
  

  useEffect(()=>{
    axios.get(url)
    .then(res=>{
      setComics(res.data.data.results)
    })
    .catch(error=>console.log(error))
  },[url]);

  function date(d){
    let creationDate = d.getDate()+"/"+d.getMonth()+"/"+d.getYear()
    return creationDate
  }



  return (
    <div className="App">
      <h1>Marvel Comics</h1>
        <div className='pagination'>
          <button onClick={()=>setpage(page-1)}>-</button>
          <h4>{page}</h4>
          <button onClick={()=>setpage(page+1)}>+</button>
        </div>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        { comics.map(comic=>(
            <div className="card" style={{width:"16rem",heigth:"18rem"}}>
              <img src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} className='card-img-top' style={{width:"90%", heigth:"80%",alignSelf:"center",marginTop:"10%"}} alt=''/>
              <div className="card-body">
                <p className="card-title">{comic.title}</p>
                <br></br>
                <p className='card-text'><strong>Creadores:</strong></p>
                <ul className="list-group">
                  {
                    comic.creators.items.map(creator =>(
                      <li className="list-group-item">{creator.name}</li>
                    ))
                  }
                </ul>
                <br></br>
                <p className='card-text'><strong>Series: </strong>{comic.series.name}</p>
                <br></br>
                <p className='card-text'><strong>Fecha de Creacion: </strong>{date(new Date(comic.dates.find(date=>date.type = 'focDate').date))}</p>
                
              </div>
          </div>
        ))
        }
      </div>
    </div>
  );
}

export default App;

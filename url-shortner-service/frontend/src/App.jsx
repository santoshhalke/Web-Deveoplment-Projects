import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

const App = () => {

  //setting a status for data
  const [urls, setUrl] = useState([]);

  // calling api 
  useEffect(() => {
    axios.get('/api/url').then((res) => {
      setUrl(res.data);
      // console.log(urls);
    }).catch((error) => {
      console.log(error);
    })
  },[]);

  return (
    <div className='container'>
      <h1>URL Shortner</h1>
      {/* <h1>All URL</h1> */}
      <table>
        <thead style={{
          border: "2px solid black"
        }}>
          <tr>
            <th>Custom URL</th>
            <th>Original URL</th>
          </tr>
        </thead>
        <tbody>
            {
              urls.length > 0 ? 
              urls.map((url) => (
                <tr key={url.id}>
                  <td> { url.customURL }</td>
                  <td><a href={url.URL}> { url.URL }</a></td>
                </tr>
              )) : <tr><td colSpan={2}>No URL Found</td></tr>
            }
        </tbody>
      </table>

    </div>
  )
}

export default App;

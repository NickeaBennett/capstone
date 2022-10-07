import React, { useEffect, useState } from 'react'

function NewsBar() {

    const [data, setData] = useState([])

    const requestOptions = {
      method: 'GET',
      headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
        'mode': 'cors',
        'private_key': 'b2ff925436a4403ab28641dba66f1b0dcebb8ca390c04d4d8951360526e7fbb7',
     },
      redirect: 'follow'
    };
    

    useEffect(() => {
        fetch("https://lodestonenews.com/news/topics?locale=en", requestOptions)
          .then((r) => r.json())
          .then(setData);
      }, []);

    
      console.log(data)


  return (
    <div className='newsbar'>
        <div className='newspost'>
            {data.map((news) => (
            <article key={news.id} className='task'>
                <img src={news.image} width="400" ></img>
                {news.title}
                {news.description}
            </article>
          ))}</div>
    </div>
  )
}

export default  NewsBar
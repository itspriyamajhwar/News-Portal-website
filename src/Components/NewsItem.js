import React, { Component } from 'react'

export class NewsItem extends Component {
  
  render() {
    let {title, description, imageUrl,newsUrl,author,date} = this.props;
    return (
      <div className='my-3'>
        <div  className="card">
           <img src={!imageUrl?"https://www.hindustantimes.com/ht-img/img/2024/06/17/1600x900/Delhi-s-Indira-Gandhi-International-Airport_1718618244341_1718618244541.jpg":imageUrl}  className="card-img-top" alt="..."/>
           <div  className="card-body">
            <h5  className="card-title">{title}</h5>
            <p  className="card-text">{description}</p>
            <p className="card-text"><small className="text-body-secondary">By {author} on {new Date(date).getTimezoneOffset()} </small></p>
             <a href={newsUrl} target='_blank'  className="btn btn-sm btn-dark">Read More </a>
        </div>
    </div>
      </div>
    )
  }
}

export default NewsItem

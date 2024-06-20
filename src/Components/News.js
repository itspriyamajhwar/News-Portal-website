import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './spinner.js';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component{
  static defaultProps ={
    country:'in',
    pageSize : 8,
    category : 'general',
  }
  static propTypes={
  country :  PropTypes.string,
  pageSize : PropTypes.number,
  category : PropTypes.string,
  }
  
  capitalizeFirstLetter = (string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  

    constructor(props){
      super(props);
      console.log("Hellow I am a constructor from News component");
      this.state = {
        articles:[],
        loading:true,
        page:1,
        totalResults:0,

       
      }
      document.title =` ${this.capitalizeFirstLetter (this.props.category)} - News Portal`;
    }

  async updateNews(){
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f7d7796739d64d7c9a80891cf4be539b&page=1&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json()
    this.props.setProgress(60);
  
    this.setState({
      articles: parsedData.articles,
      loading:false,
      totalResults: parsedData.totalResults,
    })
    this.props.setProgress(100);
  

  }
  async componentDidMount(){

  this.updateNews();
    
  }

 
 handlePrevclick = async ()=>{
  console.log("Pervious");

  //let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f7d7796739d64d7c9a80891cf4be539b&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
  //this.setState({loading: true});
  //let data = await fetch(url);
  //let parsedData = await data.json()
   //this.setState({
  // page: this.state.page - 1,
  // articles: parsedData.articles,
  // loading:fals
  //})
  this.setState({page: this.state.page - 1});
  this.updateNews();
 }
  handleNextclick = async()=>{
  console.log("Next");
  //if((!this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))) {
  
  //let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f7d7796739d64d7c9a80891cf4be539b&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
  //this.setState({loading: true});
 // let data = await fetch(url);
  //  let parsedData = await data.json()

  // this.setState({
  // page: this.state.page + 1,
 //  articles: parsedData.articles,
  // loading:false
  //})
 //}
 this.setState({page: this.state.page + 1});
 this.updateNews();
}

fetchMoreData = async() => {
  this.setState({page: this.state.page + 1})
  const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f7d7796739d64d7c9a80891cf4be539b&page=1&page=${this.state.page}&pageSize=${this.props.pageSize}`;
  
  let data = await fetch(url);
  let parsedData = await data.json()

  this.setState({
    articles: this.state.articles.concat(parsedData.articles),
  
    totalResults: parsedData.totalResults,
  
  })
};

    render() {
    return (
   <>
        <h1 className="text-center" >News Portal - Top  {
          this.capitalizeFirstLetter (this.props.category)} Headlines</h1>
        {this.state.loading && <Spinner/>}
    
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
        <div className="container">
        <div className ="row">
        { this.state.articles.map((element)=>{
           return <div className="col-md-4" key={element.url}>
              <NewsItem  title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publisheDAt}/>
                 </div>
        })}
          
        
       </div>
       </div>
       </InfiniteScroll>
      
    </>
    )
  }
}




 
 


export default News
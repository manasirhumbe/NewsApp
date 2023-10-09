import React, { Component } from 'react';
import NewsItems from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 18,
    category: 'general',
    key: 'business',
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  constructor(props) {
    super(props);
    // console.log("Hi, I'm a constructor from news component.")
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    }
    document.title = `NewsMonkey - ${this.capitalizeFirstLetter(this.props.category)}`
  }

  async updateNews() {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=918e42a533b645b5b506dbb7c26ce947&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    })
  }

  async componentDidMount() {
    this.updateNews();

  }

  // handlePrevClick = async() => {
  // console.log("Previous");

  // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=918e42a533b645b5b506dbb7c26ce947&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
  // this.setState({loading: true});
  // let data = await fetch(url);
  // let parsedData = await data.json();

  // this.setState({
  //   articles : parsedData.articles,
  //   page: this.state.page - 1,
  //   loading: false,
  // })
  // this.setState({page:this.state.page - 1})
  // this.updateNews()
  // }


  //   handleNextClick = async () => {
  //     // console.log('Next');
  // if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
  //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=918e42a533b645b5b506dbb7c26ce947&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
  //     this.setState({loading: true});
  //     let data = await fetch(url);
  //     let parsedData = await data.json();

  //     this.setState({
  //         articles : parsedData.articles,
  //         page: this.state.page + 1,
  //         loading: false,
  //       })
  //       }
  // this.setState({page:this.state.page + 1})
  //     this.updateNews()
  // }

  fetchMoreData = async () => {
    // this.setState({ page: this.state.page + 1 })
    if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
      const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=918e42a533b645b5b506dbb7c26ce947&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      this.setState({ loading: true });
      let data = await fetch(url);
      let parsedData = await data.json();

      this.setState({
        articles: this.state.articles.concat(parsedData.articles),
        totalResults: parsedData.totalResults,
        page: this.state.page + 1,
        loading: false,
      })
    }
  }


  render() {
    return (
      <div className='container my-3'>
        <h1 className='text-center my-4'>NewsMonkey Top Headlines - {this.capitalizeFirstLetter(this.props.category)}</h1>
        {/* {this.state.loading && <Spinner/>} */}

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={this.state.loading && <Spinner/>}
        >
          <div className="container">
            <div className="row">
              {this.state.articles.map((element) => {
                return <div className="col-md-4" key={element.url}>
                  <NewsItems title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                </div>
              })}
            </div>
          </div>

        </InfiniteScroll>

      </div>
    );
  }
}

export default News;

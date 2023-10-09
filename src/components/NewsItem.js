import React, { Component } from 'react';

export class NewsItems extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, date, source } = this.props;
    return (
      <div className='my-3'>
        <div className="card">
          <span className="position-absolute top-0 end-50 translate-middle badge rounded-pill bg-danger" style={{ zIndex: '1' }} > {source}</span>

          <img src={imageUrl ? imageUrl : "https://www.northampton.ac.uk/wp-content/uploads/2018/11/default-svp_news.jpg"} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text"><small className="text-muted">By {author ? author : "Unknown"} on {new Date(date).toGMTString()}</small></p>
            <a href={newsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-primary">Read More</a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItems;

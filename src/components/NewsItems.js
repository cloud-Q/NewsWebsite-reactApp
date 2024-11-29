import React from 'react'

const NewsItems = (props) => {
    
 
    let {title, description, imageUrl, newsUrl,author, date, source} = props;
    return (
      <div className='my-3'>
        <div className="card">
          <div>
        <span className="badge rounded-pill text-bg-danger" style={{display: "flex", justifyContent: "flex-end", position: "absolute", right: "0"}}>{source}</span>

          </div>

        <img src={!imageUrl?"https://nypost.com/wp-content/uploads/sites/2/2024/09/89673126.jpg?quality=75&strip=all&w=1024":imageUrl} className="card-img-top" alt="..."/>
        <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}... </p>
            <p className="card-text"><small className="text-muted">By {!author?"Unknown":author}<br/> Last updated on {new Date(date).toGMTString()} </small></p>
            <a rel="noreferrer" href={newsUrl} target='_blank' className="btn btn-sm btn-dark">Read More</a>
        </div>
        </div>
      </div>
    )
  
}

export default NewsItems

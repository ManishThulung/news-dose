import React from 'react'

function NewsItem(props) {
    const { title, description, imgsrc, newsUrl, author, date, source } = props
    return (
        <div className='my-3 '>
            <div className="card">
                <div style={{display:'flex', justifyContent: "flex-end", position: "absolute", right:'0'}}>
                    <span className=" badge rounded-pill bg-success">
                        {source}
                    </span>
                </div>
                <img src={!imgsrc ? "https://ichef.bbci.co.uk/news/1024/branded_news/C7D0/production/_122925115_screenshot2022-01-21094138.jpg" : imgsrc} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                    <p className="card-text"><small className="text-muted">Author: {!author ? "NewsApi" : author} on {new Date(date).toGMTString()}</small></p>
                    <a href={newsUrl} rel="noreferrer" target="_blank" className="btn btn-sm btn-primary">Read more..</a>
                </div>
            </div>
        </div>
    )
}

export default NewsItem

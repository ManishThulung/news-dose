import React, { useEffect, useState } from 'react'
import NewsItem from '../NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

function News(props) {
    
    const [articles, setArticles] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [totalResults, setTotalResults] = useState(0);

    const updateNews = async () => {
        props.setProgress(10)
        const urls = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=aa4f3e5b4e2e4ac19634126fc4063642&page=${page}&pageSize=${props.pageSize}`
        setLoading(true)
        let data = await fetch(urls)
        props.setProgress(40)
        let parsedData = await data.json()
        props.setProgress(75)
        console.log(parsedData);
        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setLoading(false)

        props.setProgress(100)

    }

    useEffect(() => {
        // async function fetchData(){
        //     // let url="https://newsapi.org/v2/top-headlines?country=us&category=${props.category}&apiKey=d4971fe5abbb43aaa945406b90d5ab93&page=1"
        //     let urls=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=c65c069c9ee346088a978d7bde38ed3c&page=1&pageSize=${props.pageSize}`
        //     setLoading(true)
        //     let data = await fetch(urls)
        //     let parsedData = await data.json()
        //     console.log(parsedData);
        //     setArticles(parsedData.articles)
        //     setTotalResults(parsedData.totalResults)
        //     setLoading(false)
        updateNews()
        // } 
        // fetchData()
    }, [])



    // whenever the next button is clicked the page should be increased and the fetched data must be updated again fo both next and previous
    // const handelNextclick = async () => {
    //     if (!(page + 1 > Math.ceil(totalResults / props.pageSize))) {
    //         let urls = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=c65c069c9ee346088a978d7bde38ed3c&page=${page + 1}&pageSize=${props.pageSize}`
    //         // set loading true when it hits the url and until the data are fatched
    //         setLoading(true)
    //         let data = await fetch(urls)
    //         let parsedData = await data.json()
    //         console.log(parsedData);
    //         setArticles(parsedData.articles)
    //         setPage(page + 1)
    //         // once the data are fatched make loading false again
    //         setLoading(false)

    //     }
    //     setPage(page+1)
    //     updateNews();
    // }
    // const handelPreviousclick = async () => {
    //     let urls = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=c65c069c9ee346088a978d7bde38ed3c&page=${page - 1}&pageSize=${props.pageSize}`
    //     setLoading(true)
    //     let data = await fetch(urls)
    //     let parsedData = await data.json()
    //     console.log(parsedData);
    //     setArticles(parsedData.articles)
    //     setPage(page - 1)
    //     setLoading(false)

    //     setPage(page-1)
    //     updateNews();
    // }
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    document.title = `${capitalizeFirstLetter(props.category)} - GetNews`


    const fetchMoreData = async() => {
        const urls = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=c65c069c9ee346088a978d7bde38ed3c&page=${page+1}&pageSize=${props.pageSize}`
        setPage(page+1)
        // const urls = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=c65c069c9ee346088a978d7bde38ed3c&page=${page}&pageSize=${props.pageSize}`
        // setLoading(true)
        let data = await fetch(urls)
        let parsedData = await data.json()
        console.log(parsedData);
        setArticles(articles.concat(parsedData.articles));
        setTotalResults(parsedData.totalResults)
        // setLoading(false)
    };
    return (
        <>
            <h2 className='text-center' style={{ margin: '100px 0px 29px'}}>{props.headline}</h2>
            {loading&&<Spinner />}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}
            >
                <div className='container'>

                <div className="row">
                    {
                        // loading is set true when the data are being fetched so empty the page when data is being fetched and only shows data when fetching is done
                        // !loading && articles.map((element) => { // when button is needed
                        articles.map((element) => {
                            let { title, description, urlToImage, url, author, publishedAt, source } = element
                            return (
                                <div className="col-md-4 col-sm-4 col-4" key={url}>
                                    <NewsItem
                                        title={element.title ? title : ""}
                                        description={element.description ? description : ""}
                                        imgsrc={urlToImage}
                                        newsUrl={url}
                                        author={author}
                                        date={publishedAt}
                                        source={source.name}
                                    />
                                </div>
                            )
                        })
                    }
                </div>

                </div>
            </InfiniteScroll>

                {/* for next and previous button */}
                {/* <div className='container d-flex justify-content-between'>
                    <button type="button" className="btn btn-dark" disabled={page <= 1} onClick={handelPreviousclick}>&larr; Previous</button>
                    <button type="button" className="btn btn-dark" disabled={page + 1 > Math.ceil(totalResults / props.pageSize)} onClick={handelNextclick}>Next &rarr;</button>
                </div> */}
        </>
        
    )

}
News.defaultProps = {
    country: 'in',
    pageSize: 10,
    category: 'general'
}
News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}
export default News

import React, {useEffect, useState} from 'react';

import NewsItems from './NewsItems';
import Spinner from './spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";



const News = (props)=> {
    const[articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const[page, setPage] = useState(1)
    const[totalResults, setTotalResults] = useState(0)
    // document.title = `${capitalizeFirstLetter(props.category)} - NewaMonkey`;
    
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }



    const updateNews = async ()=> {
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=eecdf1fa5c6641aba6099b500ec36ee1&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true);
        let data = await fetch(url);
        props.setProgress(40);
        let parsedData = await data.json();
        props.setProgress(70);
        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults);
        setLoading(false);
        props.setProgress(100);
    } 
    useEffect(()=> {
        updateNews();
    }, [])


    // const handlePrevClick = async () => {
    //     setPage(page - 1);
    //     updateNews();
    // };
    // const handleNextClick = async () => {
    //     // console.log(page);
    //     setPage(page + 1);
    //     updateNews();

    // };
    const fetchMoreData = async() => {
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=eecdf1fa5c6641aba6099b500ec36ee1&page=${page+1}&pageSize=${props.pageSize}`;
        setPage(page + 1);
        let data = await fetch(url);
        let parsedData = await data.json();
        setArticles(articles.concat(parsedData.articles));
        setTotalResults(parsedData.totalResults)
        console.log(parsedData);
    }


        return (
            <>
                <h1 className="text-center" style={{margin: '30px 0', marginTop: '90px' }}>News Monkey - Top {capitalizeFirstLetter(props.category)} Headlines </h1>
                {loading && <Spinner />}
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length !== totalResults}
                    loader={<Spinner/>}
                >
                    <div className="container">
                    <div className="row">
                        {articles.map((element) => {
                            return <div className="col-md-4" key={element.url} >
                                <NewsItems title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                            </div>
                        })}
                    </div>
                    </div>

                </InfiniteScroll>
           
            </>
        )
    
}
News.defaultProps = {
    country: 'us',
    pageSize: 8,
    category: 'genral',
};

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
};

export default News

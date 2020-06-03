import React, { useEffect, useState } from 'react'
import { FaCode } from "react-icons/fa";
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config';
import MainImage from './Sections/MainImage';
import GridCards from '../commons/GridCards';
import { Row } from 'antd';

function LandingPage() {

    const [Movies, setMovies] = useState([])
    const [MainMovieImage, setMainMovieImage] = useState(null)
    const [CurrentPage, setCurrentPage] = useState(0)

    useEffect(() => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
        fetch(endpoint)
            .then(response => response.json())
            .then(response => {
                console.log(response)
                setMainMovieImage(response.results[0])
            })
        //위에 fetch 함수 부분을 지우고 fetchMovies 함수의 주석을 없애고 
        //fetchMovies 함수에서 setMainMovieImage도 설정을 해주면 
        //morebutton을 클릭할 때마다 메인 이미지도 같이 변경 
        //현제는 mainimage는 고정해 놓은 상태 
        fetchMovies(endpoint)


    }, [])

    const fetchMovies = (endpoint) => {
        fetch(endpoint)
            .then(response => response.json())
            .then(response => {
                console.log(response)
                setMovies([...Movies, ...response.results])
                //setMainMovieImage(response.results[0])
                setCurrentPage(response.page)
            })
    }


    const loadMoreItems = () => {

        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${CurrentPage + 1}`;
        fetchMovies(endpoint)

    }

    return (
        <div style={{ width: '100%', margin: '0' }}>

            {/* Main Image */}
            {MainMovieImage &&
                <MainImage 
                image={`${IMAGE_BASE_URL}w1280${MainMovieImage.backdrop_path}`}
                title={MainMovieImage.original_title}
                text={MainMovieImage.overview}
                />
            }
            <div style={{ width: '85%', margin: '1rem auto' }} >

                <h2>Movies by latest</h2>
                <hr />

                {/** Movie Grid Cards */}
                <Row gutter={[16, 16]} >

                {Movies && Movies.map((movie, index) => (
                    <React.Fragment key={index}>
                        <GridCards  
                        image={movie.poster_path ?
                            `${IMAGE_BASE_URL}w500${movie.poster_path}` : null} 
                        movieId={movie.id}
                        movieName={movie.original_title}
                        />

                    </React.Fragment>
                ))}

                </Row>


            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button onClick={loadMoreItems}> Load More </button>
            </div>
        </div>
    )
}

export default LandingPage

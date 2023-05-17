import React from 'react';
import { Link } from 'react-router-dom';

import { OutlineButton } from '../components/button/Button';
import HeroSlide from '../components/hero-slide/HeroSlide';
import MovieList from '../components/movie-list/MovieList';

import { category, movieType } from '../api/tmdbApi';

const Home = () => {
    return (
        <>
            <HeroSlide />
            <div className="container  main-container">
                <div className="section mb-3">
                    <div className="section__header mb-2">
                        <h2>MOVIES YOU MUST WATCH</h2>
                        <Link to="/movie">
                            <OutlineButton className="small">Show more</OutlineButton>
                        </Link>
                    </div>
                    <MovieList category={category.movie} type={movieType.popular} />
                </div>

                <div className="section mb-3">
                    <div className="section__header mb-2">
                        <h2>RECOMMENDED FOR YOU</h2>
                        <Link to="/movie">
                            <OutlineButton className="small">Show more</OutlineButton>
                        </Link>
                    </div>
                    <MovieList category={category.movie} type={movieType.top_rated} />
                </div>
            </div>
        </>
    );
}

export default Home;

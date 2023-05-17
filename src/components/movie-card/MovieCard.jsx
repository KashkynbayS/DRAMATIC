import React from 'react';

import './movie-card.scss';

import { Link } from 'react-router-dom';

import Button from '../button/Button';

import { category } from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';

import imdb from '../../assets/imdb.png';
import eyes from '../../assets/eyes.png';
import serd from '../../assets/serd.png';

const MovieCard = props => {

    const item = props.item;

    const link = '/' + category[props.category] + '/' + item.id;

    const bg = apiConfig.w500Image(item.poster_path || item.backdrop_path);
    console.log('MovieCard', item);
    return (
        <Link to={link}>
            <div className="movie-card" style={{ backgroundImage: `url(${bg})` }}>
                <Button>
                    <i className="bx bx-play"></i>
                </Button>
            </div>
            <div className='movie__details'>
                <h3>{item.title || item.name}</h3>
                <h4>{item.release_date || item.release_date}</h4>
                <div className='movie__details__rating'>
                    <div>
                        <img src={imdb} alt="" />
                        <span>{item.vote_average || item.vote_average}</span>
                    </div>
                    <div>
                        <img src={eyes} alt="" />
                        <img src={serd} alt="" />
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default MovieCard;

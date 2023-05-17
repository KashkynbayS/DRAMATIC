import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import tmdbApi from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';

import './detail.scss';
import CastList from './CastList';
import VideoList from './VideoList';

import users from '../../assets/users.png';
import list_2 from '../../assets/list_2.png';
import download_2 from '../../assets/download_2.png';
import settings from '../../assets/settings.png';
import Vector_2 from '../../assets/Vector_2.png';
import plus from '../../assets/+.png';

import MovieList from '../../components/movie-list/MovieList';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import Button, { OutlineButton } from '../../components/button/Button';

const Detail = () => {

    let hisrory = useHistory();

    const { id } = useParams();
    const { location } = useHistory()

    const category = location.pathname.split('/')[1]

    const [item, setItem] = useState(null);

    useEffect(() => {
        const getDetail = async () => {
            const response = await tmdbApi.detail(category, id, { params: {} });
            setItem(response);
            window.scrollTo(0, 0);
        }
        getDetail();
    }, [category, id]);

    return (
        <>
            {
                item && (
                    <>
                        <div className='banner__main'>
                            <div className='left-panel'>
                                <ul className='left-panel-child'>
                                    <li><a href=""><img src={users} alt="" /></a></li>
                                    <li><a href=""><img src={list_2} alt="" /></a></li>
                                    <li><a href=""><img src={download_2} alt="" /></a></li>
                                    <li><a href=""><img src={settings} alt="" /></a></li>
                                </ul>
                            </div>
                            <div className="banner" style={{ backgroundImage: `url(${apiConfig.originalImage(item.backdrop_path || item.poster_path)})` }}>
                                <div className="mb-3 movie-content container">

                                    <div className="movie-content__info">
                                        <h1 className="title">
                                            {item.title || item.name}
                                        </h1>
                                        <p className="overview">{item.overview}</p>
                                        <div className="genres">
                                            <span className='genres__title'>Genres</span><br />
                                            {
                                                item.genres && item.genres.slice(0, 5).map((genre, i) => (
                                                    <span key={i} className="genres__item">{genre.name},</span>
                                                ))
                                            }
                                        </div>

                                        <div className="btns">
                                            <Button className="btn__p" onClick={() => hisrory.push('/movie/' + item.id)}>
                                                Watch
                                                <img src={Vector_2} alt="" />
                                            </Button>
                                            <OutlineButton className="btn__p">
                                                My List
                                                <img src={plus} alt="" />
                                            </OutlineButton>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='more__detail'>
                            <div className='video__traler'>
                                <div className="section mb-3">
                                    <VideoList id={item.id} />
                                </div>
                            </div>
                            <div className="cast">
                                <div className="section__header">
                                    <h2>Casts</h2>
                                </div>
                                <CastList id={item.id} />
                            </div>
                        </div>
                        <div className="container">
                            <div className="section mb-3">
                                <div className="section__header mb-2">
                                    <h2>MORE LIKE THIS</h2>
                                </div>
                                <MovieList category={category} type="similar" id={item.id} />
                            </div>
                        </div>
                    </>
                )
            }
        </>
    );
}

export default Detail;

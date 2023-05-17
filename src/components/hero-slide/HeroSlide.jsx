import React, { useState, useEffect, useRef } from 'react';

import SwiperCore, { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import Button, { OutlineButton } from '../button/Button';
import Modal, { ModalContent } from '../modal/Modal';

import tmdbApi, { category, movieType } from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';

import users from '../../assets/users.png';
import list_2 from '../../assets/list_2.png';
import download_2 from '../../assets/download_2.png';
import settings from '../../assets/settings.png';
import Vector_2 from '../../assets/Vector_2.png';
import plus from '../../assets/+.png';

import './hero-slide.scss';
import { useHistory } from 'react-router';

const HeroSlide = () => {

    SwiperCore.use([Autoplay]);

    const [movieItems, setMovieItems] = useState([]);

    useEffect(() => {
        const getMovies = async () => {
            const params = { page: 1 }
            try {
                const response = await tmdbApi.getMoviesList(movieType.popular, { params });
                setMovieItems(response.results.slice(1, 8));
                console.log(response);
            } catch {
                console.log('error');
            }
        }
        getMovies();
    }, []);

    return (
        <div className="hero-slide">
            <div className='left-panel'>
                <ul className='left-panel-child'>
                    <li><a href=""><img src={users} alt="" /></a></li>
                    <li><a href=""><img src={list_2} alt="" /></a></li>
                    <li><a href=""><img src={download_2} alt="" /></a></li>
                    <li><a href=""><img src={settings} alt="" /></a></li>
                </ul>
            </div>
            <Swiper
                modules={[Autoplay]}
                grabCursor={true}
                spaceBetween={0}
                slidesPerView={1}
            // autoplay={{delay: 3000}}
            >
                {
                    movieItems.map((item, i) => (
                        <SwiperSlide key={i}>
                            {({ isActive }) => (
                                <HeroSlideItem item={item} className={`${isActive ? 'active' : ''}`} />
                            )}
                        </SwiperSlide>
                    ))
                }
            </Swiper>
            {
                movieItems.map((item, i) => <TrailerModal key={i} item={item} />)
            }
        </div>
    );
}

const HeroSlideItem = props => {

    let hisrory = useHistory();

    const item = props.item;

    console.log("item", item)

    const background = apiConfig.originalImage(item.backdrop_path ? item.backdrop_path : item.poster_path);

    const setModalActive = async () => {
        const modal = document.querySelector(`#modal_${item.id}`);

        const videos = await tmdbApi.getVideos(category.movie, item.id);

        if (videos.results.length > 0) {
            const videSrc = 'https://www.youtube.com/embed/' + videos.results[0].key;
            modal.querySelector('.modal__content > iframe').setAttribute('src', videSrc);
        } else {
            modal.querySelector('.modal__content').innerHTML = 'No trailer';
        }

        modal.classList.toggle('active');
    }

    return (
        <div
            className={`hero-slide__item ${props.className} main-container`}
            style={{ backgroundImage: `url(${background})` }}
        >
            <div className="hero-slide__item__content container">
                <div className="hero-slide__item__content__info">
                    <h2 className="title">{item.title}</h2>
                    <div className="overview">{item.overview}</div>

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
    )
}

const TrailerModal = props => {
    const item = props.item;

    const iframeRef = useRef(null);

    const onClose = () => iframeRef.current.setAttribute('src', '');

    return (
        <Modal active={false} id={`modal_${item.id}`}>
            <ModalContent onClose={onClose}>
                <iframe ref={iframeRef} width="100%" height="500px" title="trailer"></iframe>
            </ModalContent>
        </Modal>
    )
}

export default HeroSlide;

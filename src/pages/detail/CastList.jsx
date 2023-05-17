import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';

import tmdbApi from '../../api/tmdbApi'
import apiConfig from '../../api/apiConfig';

const CastList = props => {
    const { location } = useHistory()

    const category = location.pathname.split('/')[1]

    const [casts, setCasts] = useState([]);

    useEffect(() => {
        const getCredits = async () => {
            const res = await tmdbApi.credits(category, props.id);
            setCasts(res.cast.slice(0, 5));
        }
        getCredits();
    }, [category, props.id]);
    return (
        <div className="casts cast__list">
            {
                casts.map((item, i) => (
                    <div key={i} className="casts__item">
                        <div className="casts__item__img" style={{ backgroundImage: `url(${apiConfig.w500Image(item.profile_path)})` }}></div>
                        <p className="casts__item__name">{item.name}</p>
                    </div>
                ))
            }
        </div>
    );
}

export default CastList;

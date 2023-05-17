import React, { useCallback, useState } from 'react';

import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import searchImg from '../../assets/search.png';
import './input.scss';

const Input = props => {
    const [keyword, setKeyword] = useState(props.keyword ? props.keyword : '');
    const history = useHistory();

    const goToSearch = useCallback(
        (event) => {
            event.preventDefault();
            if (keyword.trim().length > 0) {
                history.push(`/search/${keyword}`);
            }
        },
        [keyword, history]
    );

    return (
        <form className='search-block' onSubmit={goToSearch} >
            <input
                type={props.type}
                placeholder={props.placeholder}
                value={props.value}
                onChange={(e) => setKeyword(e.target.value)}
            />
            <button type='submit'>
                <img src={searchImg} alt="" />
            </button>
        </form>
    );
}

export default Input;

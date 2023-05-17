import React from 'react';

import { Route, Switch } from 'react-router-dom';

import Home from '../pages/Home';
import Catalog from '../pages/Catalog';
import Search from '../pages/Search';
import Detail from '../pages/detail/Detail';
import PersonDetail from '../pages/person-detail/Detail';

const Routes = () => {
    return (
        <Switch>
            <Route
                path='/search/:keyword'
                component={Search}
            />
            <Route
                path='/movie/:id'
                component={Detail}
            />
            <Route
                path='/tv/:id'
                component={Detail}
            />
            <Route
                path='/person/:id'
                component={PersonDetail}
            />
            <Route
                path='/:category'
                component={Catalog}
            />
            <Route
                path='/'
                exact
                component={Home}
            />
        </Switch>
    );
}

export default Routes;

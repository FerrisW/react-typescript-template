import React from 'react';
import { Router, HashRouter, Switch, Route } from 'react-router-dom';
import { createHashHistory } from 'history';
import loadable from '@loadable/component';
import PageLoading from '@components/PageLoading/PageLoading';
import Error from '@components/Error/Error';

const history = createHashHistory();
const loadableOptions = { fallback: <PageLoading /> };
const LoginCom = loadable(() => import('@containers/Login/Login'), loadableOptions);
const BaseTpl = loadable(() => import('@containers/common/BaseTemplate'), loadableOptions);

const App: React.FC = () => {
    return (
        <Router history={history}>
            <HashRouter>
                <Switch>
                    <Route path="/login" exact component={LoginCom} />
                    <Route path="/" component={BaseTpl} />
                    <Route component={Error} />
                </Switch>
            </HashRouter>
        </Router>
    );
};

export default App;

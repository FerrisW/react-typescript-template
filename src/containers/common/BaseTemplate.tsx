import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { Layout } from 'antd';
import Sider from '@components/Sider/Sider';
import { Routers } from './router';

const { Header, Content, Footer } = Layout;

const BaseTpl: React.FC = () => {
    return (
        <Layout>
            <Sider />
            <Layout>
                <Header></Header>
                <Content>
                    <Router>
                        <Switch>
                            {Routers.map(({ key, exact, path, component }) => {
                                return <Route key={key} exact={exact} path={path} component={component} />;
                            })}
                        </Switch>
                    </Router>
                </Content>
                <Footer></Footer>
            </Layout>
        </Layout>
    );
};

export default BaseTpl;

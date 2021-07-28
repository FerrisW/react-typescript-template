/* eslint-disable  @typescript-eslint/no-explicit-any */
import React from 'react';
import loadable from '@loadable/component';
import PageLoading from '@components/PageLoading/PageLoading';

const loadComponent = (loader: () => Promise<any>) => loadable(loader, { fallback: <PageLoading /> });

const Home = loadComponent(() => import('@containers/Home/Home'));
const About = loadComponent(() => import('@containers/About/About'));

interface RouteItem {
    title: string;
    key: string;
    path: string;
    exact?: boolean;
    component: React.ComponentType;
}

export const Routers: RouteItem[] = [
    {
        title: '首页',
        key: 'index',
        path: '/',
        exact: true,
        component: Home
    },
    {
        title: '关于',
        key: 'about',
        path: '/about',
        exact: true,
        component: About
    }
];

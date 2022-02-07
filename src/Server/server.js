import express from 'express';
import webpack from 'webpack';
import React from 'react';
import helmet from 'helmet';
import {renderToString} from 'react-dom/server';
import {dom} from '@fortawesome/fontawesome-svg-core';
// import {renderRoutes} from 'react-router-config';
// import { StaticRouter } from 'react-router';
// import serverRoutes from '../Frontend/Router/serverRoutes';
import Main from '../Frontend/containers/Main'
import getManifest from './getManifest';

import { env, port } from './config';

const app = express();

if(env === 'development'){
    console.log('development config');
    const webpackConfig = require('../../webpack.config');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');
    const compiler = webpack(webpackConfig);
    const serverConfig = {
        publicPath: webpackConfig.output.publicPath,
        serverSideRender: true,
    };
    app.use(webpackDevMiddleware(compiler, serverConfig));
    app.use(webpackHotMiddleware(compiler));
}else{
    app.use((req, res, next)=>{
        if(!req.hashManifest){
            req.hashManifest = getManifest();
        };
        next()
        app.use(helmet());
    });
    app.use(express.static(`${__dirname}/public`));
}

const renderApp = (req, res)=>{
    const html = renderToString(
        <Main />
    );
    res.send(setResponse(html, req.hashManifest))
}

const setResponse = (html, manifest) =>{
    const mainStyles = manifest ? manifest['main.css'] : 'assets/app.css';
    const mainBuild = manifest ? manifest['main.js'] : 'assets/app.js';
    const vendorBuild = manifest ? manifest['vendors.js'] : 'assets/vendor.js';
    return(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel='stylesheet' href=${mainStyles} type='text/css' />
            <style type='text/css'>${dom.css()}</style>
            <title>weather</title>
        </head>
        <body>
            <div id='root'>${html}</div>
            <script type='text/javascript' src=${mainBuild}/>
            <script type='text/javascript' src=${vendorBuild}/>
        </body>
        </html>
    `)
};

app.get('*', renderApp);

app.listen(port, (err)=>{
    err ? console.error(err) : console.log('Server is running in port 5000');
})
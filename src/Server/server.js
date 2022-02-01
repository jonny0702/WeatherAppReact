import express from 'express';
import webpack from 'webpack';
import React from 'react';
import {renderToString} from 'react-dom/server';
import {renderRoutes} from 'react-router-config';
import { StaticRouter } from 'react-router';
import serverRoutes from '../Frontend/Router/serverRoutes';

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
};

const renderApp = (req, res)=>{
    const html = renderToString(
        <StaticRouter location={req.url} context={{}}>
            {renderRoutes(serverRoutes)}
        </StaticRouter>
    );
    res.send(setResponse(html))
}

const setResponse = (html) =>{
    return(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel='stylesheet' href='assets/app.css' type='text/css' />
            <title>weather</title>
        </head>
        <body>
            <div id='root'>${html}</div>
            <script type='text/javascript' src='assets/app.js'/>
        </body>
        </html>
    `)
};

app.get('*', renderApp);

app.listen(port, (err)=>{
    err ? console.error(err) : console.log('Server is running in port 5000');
})
require('ignore-styles')

require('asset-require-hook')({
    extensions: ['jpg', 'mp4', 'gif', 'png', 'svg'],
    name: '/assets/[hash].[ext]'
})

require('@babel/register')({
    presets:['@babel/preset-env', '@babel/preset-react']
});

require('./server')
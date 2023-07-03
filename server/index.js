const express = require('express');

const app = express();

app.use((req, res, next) => {
    let StartTime = Date.now();
    res.on('finish', () => {
        const { method, path, hostname, baseUrl,  ip, route, params, originalUrl, protocol, url, statusCode } = req;
        console.log(method, path, hostname, baseUrl,  ip, params, originalUrl, protocol, url);
    });
    next();
});

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'This is sample message'
    });
});

app.listen(4000);
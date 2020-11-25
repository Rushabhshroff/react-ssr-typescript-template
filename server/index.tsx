global.fetch = require('node-fetch')
global.FormData = require('form-data');
const PORT = process.env.PORT || 8080
import express from 'express'
import path from 'path'
import fs from "fs";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom";

import App from "../src/App";
import { Helmet } from 'react-helmet'
const app = express()

app.use(express.static(path.resolve('./build'), { index: false }));

app.get("/*", (req, res, next) => {
    fs.readFile(path.resolve("./build/index.html"), "utf-8", (err, data) => {
        if (err) {
            console.error(err);
            return res.sendStatus(500)
        }
        const ssr = ReactDOMServer.renderToString(
            <StaticRouter location={req.originalUrl}>
                <App />
            </StaticRouter>
        );
        const helmet = Helmet.renderStatic();
        return res.send(
            data.replace('<div id="root"></div>', `<div id="root">${ssr}</div>`)
                .replace("</head>", `${helmet.meta.toString()}</head>`)
                .replace("</head>", `${helmet.title.toString()}</head>`)
                .replace("</head>", `${helmet.script.toString()}</head>`)
        );
    });
});

app.listen(PORT, () => {
    console.log("Running on PORT " + PORT);
})
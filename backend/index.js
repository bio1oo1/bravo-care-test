const http = require('http');
const https = require('https');
const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
require('dotenv').config();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use('/', require('./routes'));

const port = process.env.PORT || 3000;
app.listen(port);
console.log(`DEV_MODE is on ${port} port`);

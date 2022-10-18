const http = require('http');
const https = require('https');
const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use('/', require('./routes'));

app.listen(3000);
console.log(`DEV_MODE is on 3000 port`);

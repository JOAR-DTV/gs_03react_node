const functions = require('firebase-functions');
const express = require("express");
const requestPromise = require('request-promise-native');
const cors = require('cors');
const app = express();
app.use(cors());

const getDataFromApi = async keyword => {
    const requestUrl = 'http://weather.livedoor.com/forecast/webservice/json/v1?city=';
    const result = await requestPromise(`${requestUrl}${keyword}`);
    return result;
}

// 名古屋:  230010
// 豊橋:    230020
// 岐阜:    210010
// 高山:    210020
// 津:      240010
// 尾鷲:    240020

app.get('/weather/:keyword', cors(), async (req, res) => {
    const response = await getDataFromApi(req.params.keyword);
    res.send(response);
});

const api = functions.https.onRequest(app);
module.exports = { api };
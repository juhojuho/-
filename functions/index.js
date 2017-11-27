const functions = require('firebase-functions');
const axios = require('axios');
const cors = require('cors')({ origin: true });
const urlencode = require('urlencode');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });


exports.searchNaver = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    const config = {
      headers: { 'X-Naver-Client-Id': '17cTqFu_FqQCdkB_J0Ot', 'X-Naver-Client-Secret': 'avra3y4THR' }
    };
    const encodedQuery = urlencode(req.query.q);
    axios.get(`https://openapi.naver.com/v1/search/shop.json?query=${encodedQuery}&display=10&start=1&sort=sim`, config)
      .then((ress) => {
        console.log(res.data);
        res.json(ress.data);
      });
  });
});

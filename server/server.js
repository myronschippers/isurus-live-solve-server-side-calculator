const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.listen(PORT, () => {
    console.log('Listening on port: ', PORT);
});

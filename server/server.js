const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api/calculation', (req, res) => {
    console.log(req.body);
    res.send('OK');
})

app.listen(PORT, () => {
    console.log('Listening on port: ', PORT);
});

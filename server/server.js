const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

const history = [];

app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/history', (req, res) => {
    console.log('GET');
    res.send(history);
});

app.post('/api/calculation', (req, res) => {
    console.log('POST:', req.body);
    const mathObject = {
        numberOne: parseInt(req.body.numberOne),
        numberTwo: parseInt(req.body.numberTwo),
        mathType: req.body.mathType,
    };
    const answer = calculateEquation(mathObject);
    mathObject.answer = answer;

    history.push(mathObject);

    res.send('OK');
});

app.listen(PORT, () => {
    console.log('Listening on port: ', PORT);
});

function calculateEquation(mathObject) {
    if (mathObject.mathType === 'add') {
        return mathObject.numberOne + mathObject.numberTwo;
    } else if (mathObject.mathType === 'subtract') {
        return mathObject.numberOne - mathObject.numberTwo;
    } else if (mathObject.mathType === 'multiply') {
        return mathObject.numberOne * mathObject.numberTwo;
    } else if (mathObject.mathType === 'divide') {
        return mathObject.numberOne / mathObject.numberTwo;
    }
}
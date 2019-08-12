const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

const calculationHistory = [];

app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api/calculation', (req, res) => {
    console.log(req.body);
    const newMathHistoryObject = {
        numberOne: parseInt(req.body.numberOne),
        numberTwo: parseInt(req.body.numberTwo),
        mathType: req.body.mathType,
        answer: answer,
    };
    const answer = runCalculation(newMathHistoryObject);
    newMathHistoryObject.answer = answer;

    calculationHistory.push(newMathHistoryObject);
    console.log(calculationHistory);
    res.send('OK');
});

app.get('/api/history', (req, res) => {
    res.send(calculationHistory);
});

app.listen(PORT, () => {
    console.log('Listening on port: ', PORT);
});

function runCalculation(mathObject) {
    switch (mathObject.mathType) {
        case 'add':
            return mathObject.numberOne + mathObject.numberTwo;
        case 'subtract':
            return mathObject.numberOne - mathObject.numberTwo;
        case 'multiply':
            return mathObject.numberOne * mathObject.numberTwo;
        case 'divide':
            return mathObject.numberOne / mathObject.numberTwo;
        default:
            return mathObject.numberOne + mathObject.numberTwo;
    }
}

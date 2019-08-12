console.log('Good Morning Isurus!!!');

const mathObject = {
    numberOne: '',
    numberTwo: '',
    mathType: '',
};

$(document).ready(init);

function init() {
    console.log('DOM is Ready');

    $('.js-calculate').on('click', clickCalculate);
    $('.js-clear').on('click', clickClear);
    $('.js-math').on('click', clickMathOperator);

    getHistory();
}

function clickCalculate(event) {
    console.log('Calculate');
    mathObject.numberOne = $('.js-number-one').val();
    mathObject.numberTwo = $('.js-number-two').val();

    postCalculation();
}

function postCalculation() {
    $.ajax({
        type: 'POST',
        url: '/api/calculation',
        data: mathObject,
    })
    .then(function(response) {
        console.log(response);
        getHistory();
    });
}

function getHistory() {
    $.ajax({
        type: 'GET',
        url: '/api/history',
    })
    .then(function(response) {
        console.log(response);
        console.table(response);
        render(response);
    });
}

function clickClear(event) {
    console.log('Clear');
    $('.js-number-one').val('');
    $('.js-number-two').val('');
}

function clickMathOperator(event) {
    console.log('Math me...');
    // add math type to object
    const mathButton = $(this);
    console.log(mathButton.data())
    mathObject.mathType = mathButton.data().mathType;
    console.log('mathObject: ', mathObject);
}

function typeToOperator(type) {
    let operator = '';

    switch(type) {
        case 'add':
            operator = '+';
            break;
        case 'subtract':
            operator = '-';
            break;
        case 'multiply':
            operator = '*';
            break;
        case 'divide':
            operator = '/';
            break;
    }
    console.log(operator);

    return operator;
}

function render(historyArray) {
    const lastIndex = historyArray.length -1;
    const latObject = historyArray[lastIndex];
    const lastAnswer = latObject.answer;

    $('.js-answer').text(lastAnswer);

    const equationList = $('.js-history');
    equationList.empty();

    for (let equation of historyArray) {
        equationList.append(`
            <li>
                ${equation.numberOne} ${typeToOperator(equation.mathType)} ${equation.numberTwo} = ${equation.answer}
            </li>
        `);
    }

}
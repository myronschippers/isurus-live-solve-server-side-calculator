console.log('Hey there Isurus!!!');

const calculationObject = {
    numberOne: 0,
    mathType: 'add',
    numberTwo: 0,
};

$(document).ready(init);

function init() {
    console.log('Ready to go.');
    $('.js-math').on('click', clickMathOperator);
    $('.js-calculate').on('click', clickCalculate);
    $('.js-clear').on('click', clickClear);
}

function clickMathOperator(event) {
    const operatorBtn = $(this);
    console.log(operatorBtn.data().mathType);
    calculationObject.mathType = operatorBtn.data().mathType;
}

function clickCalculate(event) {
    // get numbers and post to server
    // store number one value
    calculationObject.numberOne = $('.js-number-one').val();
    calculationObject.numberTwo = $('.js-number-two').val();

    $.ajax({
        type: 'POST',
        url: '/api/calculation',
        data: calculationObject,
    })
    .then(function(response) {
        console.log(response);
    })
}

function clickClear(event) {
    // clear all entered values
    $('.js-number-one').val('');
    $('.js-number-two').val('');

    calculationObject.numberOne = 0;
    calculationObject.numberTwo = 0;
}
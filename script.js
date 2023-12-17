document.getElementById('loanForm').addEventListener('submit', function (event) {
    event.preventDefault();

    var name = document.getElementById('name').value;
    var birthday = new Date(document.getElementById('birthday').value);
    var category = document.getElementById('category').value;
    var interests = Array.from(document.querySelectorAll('input[name="interests"]:checked')).map(i => i.value);
    var photo = document.getElementById('photo').files[0];

    //Сумма займа
    var loanAmount = parseFloat(document.getElementById('loanAmount').value);
    //Срок займа
    var loanTerm = parseInt(document.getElementById('loanTerm').value);
    //Процентная ставка
    var interestRate = parseFloat(document.getElementById('interestRate').value) / 100;
    //Размер первоначального взноса 
    var initialPayment = parseFloat(document.getElementById('initialPayment').value);
    //Комиссионные сборы
    //var commission = parseFloat(document.getElementById('commission').value);
    //Дата первой оплаты
    //var firstPaymentDate = new Date(document.getElementById('firstPaymentDate').value);



    // Расчет аннуитетного платежа
    var monthlyInterestRate = interestRate / 12;
    var annuityPayment = loanAmount * (monthlyInterestRate + monthlyInterestRate / (Math.pow(1 + monthlyInterestRate, loanTerm) - 1));

    //var annuityPayment = loanAmount * (monthlyInterestRate / (1 + monthlyInterestRate) - loanTerm - 1);

    //Рассчет по дифференциальной системе
    var ost = (loanAmount - initialPayment);
    var diffPayment = (ost/ loanTerm)  + (ost * monthlyInterestRate);            


    var obsumva = annuityPayment * loanTerm;
    var obsumpa = (annuityPayment * loanTerm) - loanAmount;
    var obsumvd = diffPayment * loanTerm;
    var obsumpd = (diffPayment * loanTerm) - loanAmount;

    var itog =(obsumpa < obsumpd) ? "Ануитентный платёж лучше" : "Дифференциальный платёж лучше";

    var output = 'ФИО: ' + name + '<br>' +
        'Дата рождения: ' + birthday.toDateString() + '<br>' +
        'Категория: ' + category + '<br>' +
        'Интересы: ' + interests.join(', ') + '<br>' +
        'Фото: <img src="' + URL.createObjectURL(photo) + '" alt="Photo" /><br><br><br><br>' +
        'Ежемесячный Ануитентный платёж: ' + annuityPayment.toFixed(2) + ' рублей<br>'+
        'Общая сумма выплат: ' + obsumva.toFixed(2)  + ' рублей<br>' +
        'Общая сумма процентов: ' + obsumpa.toFixed(2) + ' рублей<br>'+
        'Ежемесячный Дифференциальный платёж: ' + diffPayment.toFixed(2) + ' рублей<br>' +
        'Общая сумма выплат: ' + obsumvd.toFixed(2) + ' рублей<br>' +
        'Общая сумма процентов: ' + obsumpd.toFixed(2)  + ' рублей<br>' +
        itog;
;
   

    document.getElementById('output').innerHTML = output;
});

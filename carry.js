/**
* Каррирование
**/

function sum() {
    let sum = 0;
    let len = arguments.length;
    for(let i = len; i--;){
        sum += arguments[i];
    }
    return sum;
}


//Каррирование с помощью bind
var myBind = sum.bind(null,10,10,10);
console.log('Каррирование через bind: ',myBind(1,1,1));

//Общий случай
function carry(f) {
    //Получаем массив всех аргуметов функции, кроме функции f
    let slice = Array.prototype.slice.call(arguments, 1);

    return function () {
        //склеиваем массивы в один
        let newArr = slice.concat(Array.prototype.slice.call(arguments));

        //вызвращаем функцию со всеми аргументами
        return f.apply(null, newArr);
    }
}

var getCarry = carry(sum, 10,10,10)(20,10);
console.log('Общий способ каррирования: ', getCarry);
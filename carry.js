/**
* Каррирование функции sum
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

/**
 * САМОПЕРЕЗАПИСЫВАЮЩАЯСЯ ФУНКЦИЯ
 * Для примера, при первом запуске - покрасит все div в красный цвет
 * Далее вызов функции поменяет цвет на желтый
 **/

let doRewrite = function() {
    let divs = Array.from(document.querySelectorAll('div'));

    divs.forEach((elem) => {elem.style.backgroundColor = 'red'});
    //перезаписываем функцию
    doRewrite = function () {
        divs.forEach((elem) => {elem.style.backgroundColor = 'white'});
    }
};

/**
 * ФУНКЦИЯ ХРАНЯЩАЯ РЕЗУЛЬТАТЫ СВОЕГО ВЫПОЛНЕНИЯ В КЭШЭ
 * Функция записывает свои состояния в свойство cache.id
 * Функция принимает аргумент в виде объекта, по идее это должны быть большие объемы данных
 **/

let goods1 = {
    id: 'id1',
    arr: [3,2,2,4,5,6,7,67,11]
};

let goods2 = {
    id: 'id2',
    arr: [3,2,2,54,5,6,7,6,11]
};

function getSortNum(obj) {
    let {id, arr} = obj;

    if (!getSortNum.cache){
        getSortNum.cache = {};
        }

    if (!getSortNum.cache[id]){
        arr = arr.sort((a, b) => (a - b));
        getSortNum.cache[id] = arr;
        console.log('Новое значение сортировки записано в cache')
    }
    return getSortNum.cache[id];
}

getSortNum(goods1);
getSortNum(goods1);
getSortNum(goods2);
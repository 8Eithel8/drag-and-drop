const informers = document.querySelector('.informers');
const links = Array.from(informers.querySelectorAll('.link'));
const images = Array.from(informers.querySelectorAll('img'));

const getElements = () => Array.from(informers.querySelectorAll('.informers__item'));
// const dataId = Array.from(informers.querySelectorAll('[data-id]'));


//устанавливаем значения атрибута draggable
links.forEach((item) => item.draggable = false);
images.forEach((item) => item.draggable = false);
getElements().forEach((item) => item.draggable = true);


function getOrder () {
    //находим и сохраняем в массив значения атрибута data-id всех элементов
    const newArr = getElements().map((item) => item.getAttribute('data-id')).join('|');
    //сохраняем порядок в LS
    localStorage.setItem('dataOrder', newArr);
}


// устанавливаем слушатели
informers.addEventListener(`dragstart`, (evt) => {
    evt.target.classList.add(`selected`);
});

informers.addEventListener(`dragend`, (evt) => {
    evt.target.classList.remove(`selected`);
    getOrder();
});

//получаем координаты и возвращаем следующий
const getNextElement = (cursorPosition, currentElement) => {
    const currentElementCoord = currentElement.getBoundingClientRect();
    const currentElementCenter = currentElementCoord.y + currentElementCoord.height / 2;

    return (cursorPosition < currentElementCenter) ?
        currentElement :
        currentElement.nextElementSibling;
};

//устанавливаем слушатель на перетаскивание
informers.addEventListener(`dragover`, (evt) => {
    evt.preventDefault();

    const activeElement = informers.querySelector(`.selected`);
    const currentElement = evt.target;
    const isMoveable = activeElement !== currentElement &&
        currentElement.classList.contains(`informers__item`);

    if (!isMoveable) {
        return;
    }

    const nextElement = getNextElement(evt.clientY, currentElement);

    if (
        nextElement &&
        activeElement === nextElement.previousElementSibling ||
        activeElement === nextElement
    ) {
        return;
    }

    informers.insertBefore(activeElement, nextElement);
});




  // function getOrder () {
  //           const order = localStorage.getItem(informersOrders);
  //           return order ? order.split('|') : [];
  // };

 //  function  () {
 //            var order = sortable.toArray();
 //            localStorage.setItem(sortable.options.group.name, order.join('|'));
 // }

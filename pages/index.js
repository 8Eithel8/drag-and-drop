const informers = document.querySelector('.informers');
const informersElements = Array.from(informers.querySelectorAll('.informers__item'));
const links = Array.from(informers.querySelectorAll('.link'));
const images = Array.from(informers.querySelectorAll('img'));

links.forEach((item) => item.draggable = false);

images.forEach((item) => item.draggable = false);

informersElements.forEach((item) => item.draggable = true);

informers.addEventListener(`dragstart`, (evt) => {
    evt.target.classList.add(`selected`);
});

informers.addEventListener(`dragend`, (evt) => {
    evt.target.classList.remove(`selected`);
});

const getNextElement = (cursorPosition, currentElement) => {
    const currentElementCoord = currentElement.getBoundingClientRect();
    const currentElementCenter = currentElementCoord.y + currentElementCoord.height / 2;

    return (cursorPosition < currentElementCenter) ?
        currentElement :
        currentElement.nextElementSibling;
};

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

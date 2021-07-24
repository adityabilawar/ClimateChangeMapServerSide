export default function createElement(tag, strng, cls) {
    var ele = document.createElement(tag);
    if (strng !== '') {
        ele.appendChild(document.createTextNode(strng));
    }
    ele.classList.add(cls);
    return ele;
}
export function createButton(tag, strng, cls, fnctn) {
    var ele = this.createElement(tag, strng, cls)
    parent.appendChild(ele);
    ele.addEventListener('click', fnctn);
    return ele;
}

const target = document.getElementById('first');

const main = document.getElementsByTagName('main')[0];

console.log(main)

target.addEventListener('focus', (event) => {

    console.log(event)

    console.log(target.innerText)

    target.innerText = ''

    // let paste = (event.clipboardData || window.clipboardData).getData('text');
    // // paste = paste.toUpperCase();
    // paste = '';
    //
    // const selection = window.getSelection();
    //
    // if (!selection.rangeCount)
    //     return false;
    //
    // selection.deleteFromDocument();
    // selection.getRangeAt(0).insertNode(document.createTextNode(paste));
    // event.preventDefault();
});

target.addEventListener('paste', (event) => {

    let paste = (event.clipboardData || window.clipboardData).getData('text');

    console.log(paste);

    target.innerText = paste;

    target.blur();

    let node = document.createElement('div');
    let textNode = document.createTextNode('Insert link here');
    node.classList.add('link')
    node.appendChild(textNode);
    // Append the text to <li>
    main.insertBefore(node, main.childNodes[0]);     // Append <li> to <ul> with id='myList'

    // const selection = window.getSelection();
    //
    // if (!selection.rangeCount)
    //     return false;
    //
    // selection.deleteFromDocument();
    // selection.getRangeAt(0).insertNode(document.createTextNode(paste));
    // event.preventDefault();


});
const main = document.getElementsByTagName('main')[0];

let target = main.getElementsByClassName('link')[0];

// console.log(main)

let initTarget = function () {

    target.addEventListener('focus', (event) => {

        // console.log(event)

        // console.log(target.innerText)

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

        paste = paste + '';

        console.log(paste)

        if (paste.startsWith('https://') || paste.startsWith('http://')) {

        } else {
            target.innerText = '';
            return;
        }


        target.innerText = paste;

        target.blur();

        let node = document.createElement('div');
        node.classList.add('link');
        node.contentEditable = 'true';
        let textNode = document.createTextNode('Insert link here');
        node.appendChild(textNode);

        main.insertBefore(node, main.childNodes[0]);     // Append <li> to <ul> with id='myList'

        target.contentEditable = 'false';
        target = node;
        initTarget();

        const response = get('/url?url=' + paste);
        // const data = response.data;

        console.log(JSON.parse(response))

        // const selection = window.getSelection();
        //
        // if (!selection.rangeCount)
        //     return false;
        //
        // selection.deleteFromDocument();
        // selection.getRangeAt(0).insertNode(document.createTextNode(paste));
        // event.preventDefault();
    });
};

initTarget();



function get(theUrl) {

    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}
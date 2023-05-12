let pages_metadata = [];

function create_main_div() {

    let div = createDiv("");

    div.setAttribute("id", "main_div")
    div.setAttribute("class", "markdown-body")

    return div;
}

function createBtn(index, value) {
    if ( index < 0|| index >= pages_metadata.length)
        return '';
    let button  = document.createElement('button')
    button.setAttribute("class", "send-button")
    button.setAttribute("role", "button")
    button.setAttribute("onclick", "singlePageLoder('"+ index +"')")

    button.innerHTML = value;

    return button;
}


function btnCreator(index) {

    let nextBtn = createBtn(parseInt(index) + 1, "Next")
    let previous = createBtn(parseInt(index)- 1, "Previous")

    let btnRow = createDiv("b13");

    btnRow.append(previous)
    btnRow.append(nextBtn)

    return btnRow;
}

const pagesLoader = function (content, index){

    //main div
    let main_div = create_main_div()
    main_div.innerHTML = md.render(content);

    let  btnRow = btnCreator(index)

    let section = document.getElementById("main_section")

    //remove all child
    section.innerHTML='';

    section.append(main_div)
    section.append(btnRow)
}

function pageLoadHandler(data){

    pages_metadata = data;
    singlePageLoder(0)
}

function singlePageLoder(index){

    if (index < 0 || index >= pages_metadata.length)
        return;

    getPageContent(
        pages_metadata[index].link,
        (md_content) => pagesLoader(md_content, index)
    )
}


//Content retrive handler

function getPageContent(endpoint, callback){

    caller(
        endpoint,
        'GET',
        (data) => pageContent(data, callback),
        (error) => console.log(error)
    );

}

const pageContent = function(data, callback){

    data.json().then( d => {

        callback(utf8Base64Decoder(d.content))
    })
}


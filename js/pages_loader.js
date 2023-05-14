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

function loadLesson(content, index) {

 /*   let main_div = create_main_div()


    main_div.innerHTML = content;
    main_div.append(btnCreator(index))

    return main_div;*/
    return loadQuestion(content,index)
}

function loadQuestion(content, index) {

    let main_div = create_main_div()
    //let d = getQuestionContent(content)

    let d = secondOne(content)

    main_div.append(d)
    return  main_div;
}

const pagesLoader = function (content, index, type){

    let content_decode  = md.render(content)

    let section = document.getElementById("main_section")
    //remove all child
    section.innerHTML='';

    if (type === LESSON_PAGE_TYPE)
        section.append(loadLesson(content_decode , index))
    else
        section.append(loadQuestion(content_decode , index))
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
        md_content => pagesLoader(md_content, index, pages_metadata[index].type)
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


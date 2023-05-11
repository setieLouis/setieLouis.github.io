
const pagesLoader = function (content, prevPage, nextPage){

    let div = createDiv("");

    div.innerHTML = md.render(content);

    div.setAttribute("id", "main_div")
    div.setAttribute("class", "markdown-body")

    let section = document.getElementById("main_section")
    //clean up
    section.innerHTML='';
    section.append(div);
}

function pageLoadHandler(pagesMetadata){

    firstPageContentGetter(pagesMetadata[0].link, (mdContent) => { pagesLoader(mdContent)})
}


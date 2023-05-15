
let allMeta = []

function questionMeta(index){
    return {
        text: "",
        index: index,
        haveChecked: 0,
        response: [], // list of number
        userResponse: [] // list of number
    }
}

const boxStateListener = function(event){

    let index = parseInt(event.target.id[0])
    let metadata = allMeta[index]

    if (event.target.checked){
        metadata.haveChecked += 1
    }else {
        metadata.haveChecked -= 1
    }
}

const radioStateListener = function(event){

    let index = parseInt(event.target.id[0])
    let metadata = allMeta[index]
    if (metadata.haveChecked == 0)
        metadata.haveChecked++

    console.log(allMeta)
}


function isEnder(value) {
    let pattern = /<!--\/\?-->/
    return pattern.test(value)
}

function isQuestion(value){

    let pattern = /<!--\?-->/
    return pattern.test(value)
}

function removeQuestionTag(value){

    return value.replace(/<!--\?-->/, "")
}

function ender(element) {

    return element.nodeName == 'P' &&  isEnder(element.textContent);
}



function searchForUls(h) {

    let metadata = questionMeta(allMeta.length);
    h.style.display = 'none'

    let element = h.nextSibling
    let index = 0;
    let flag = true

   while (index <= 30 && flag){

        let currElement = element;
        element = element.nextSibling

        if (currElement == null)
            continue

       if (ender(currElement)){
           currElement.style.display= 'none'
           break
       }
       handlingH(currElement, metadata)
       handlingUl(currElement,metadata)

       index++;
   }

   allMeta.push(metadata);
}
function handlingH(currElement, metadata) {

    if (/^H[1-6]/.test(currElement.nodeName) && isQuestion(currElement.textContent)){
        // do some thing with question

        let content = removeQuestionTag(currElement.textContent);
        metadata.text = content;
        currElement.textContent =  content;

        let div = createDiv("title")
        let tmp = currElement;
        //div.append(tmp)

        currElement.replaceWith(div)
        div.append(currElement)

        let p  = document.createElement('p')
        p.textContent = "not that question is required"
        p.setAttribute("class",  "required_field")
        p.setAttribute("id",  metadata.index + "_required")

        div.append(p)


    }
}

function handlingUl(currElement, metadata){

    if (currElement.nodeName == "UL"){
        let liIndex = 0;
        let df = createDiv("single_question_response")
        let childs = currElement.childNodes;

        for (let j = 0; j < childs.length; j++) {
            let node = childs[j];

            if ("li".normalize() === node.nodeName.toLowerCase().normalize()) {

                df.append(formatInput(node.textContent,metadata, liIndex))
                liIndex++
            }
        }
        currElement.replaceWith(df)
    }
}


function isRightCheckBox(value) {
    return /^\[x\]/.test(value)
}

function isRightOption(value){

    return /^\(x\)/.test(value);
}

function isCheckBox(value){

    return /^\[ \]/.test(value) || isRightCheckBox(value) ;
}

function isOptions(value){

    return /^\( \)/.test(value) || isRightOption(value) ;
}


function formatCheckBox(value){

    return value.replace(/^\[ \]/, "").replace(/^\[x\]/,"");
}


function formatOption(value){

    return value.replace(/^\( \)/, "").replace(/^\(x\)/, "");
}


function formatInput(content, metadata, currIndex ) {

    let id = '' + metadata.index + currIndex

    if(isCheckBox(content)){

        if (isRightCheckBox(content))
            metadata.response.push(currIndex)

        return createCheckBox(formatCheckBox(content),metadata.index, currIndex)

    } else if (isOptions(content)) {

        if (isRightOption(content))
            metadata.response.push(currIndex)

        return  createOption(formatOption(content),metadata.index, currIndex)
    }
}

function createCheckBox(value, id, currIndex){

    let boxId = id + '' +currIndex
    //input
    let input  = document.createElement('input')
    input.setAttribute("type", "checkbox")
    input.setAttribute("name", boxId)
    input.setAttribute("value", currIndex)
    input.setAttribute("id", boxId)
    input.setAttribute("class", id + '_frm form-check-input')
    //input.setAttribute("value", "form-check-checkbox")

    //label
    let label  = document.createElement('label')
    label.setAttribute("class", "form-check-label")
    label.setAttribute("for", boxId)
    label.innerHTML= value

    //div
    let div  = document.createElement('div')
    div.setAttribute("class", "form-check")

    div.append(input)
    div.append(label)
    div.addEventListener('change', boxStateListener)
    return div;
}

function createOption(value, id, currIndex){

    //input
    let input  = document.createElement('input')
    input.setAttribute("type", "radio")
    input.setAttribute("id", ''+ id + currIndex)
    input.setAttribute("name", id)
    input.setAttribute("value",  currIndex)
    input.setAttribute("class",  id + '_frm form-check-input')

    //label
    let label  = document.createElement('label')
    label.setAttribute("class", "form-check-label")
    label.setAttribute("for", ''+ id + currIndex)
    //input.setAttribute("for", "id_")
    label.innerHTML= value

    //div
    let div  = document.createElement('div')
    div.setAttribute("class", "form-check")

    div.append(input)
    div.append(label)

    div.addEventListener('change',radioStateListener)
    return div;
}

function createDiv(className){
    let div  = document.createElement('div')
    div.setAttribute("class", className)
    return div
}

function handleTitle(div, list){

    list.forEach(h => {
        let text = h.textContent;

        if (isQuestion(text)){

            searchForUls(h)
        }
    })
}

function secondOne(body){
    let  div = createDiv("");
    div.innerHTML= body

    let list = div.querySelectorAll("p")

    handleTitle(div,list)

    return div;
}

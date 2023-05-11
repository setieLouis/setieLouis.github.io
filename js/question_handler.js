
let response = [];
let resonseIndex = 0;


function handleQuestion(body){


    console.log("*********************************")
    console.log("*                               *")
    console.log("*  WELCOME TO QUESTION HANDLER  *")
    console.log("*                               *")
    console.log("*********************************")


    let tmpDiv = createDiv("tmp");
    tmpDiv.innerHTML=body
    console.log(tmpDiv)
    let uls = tmpDiv.querySelectorAll("ul");
    return core(uls)
}

function addQuestionData(questionData ){
    response[resonseIndex++] = questionData;
}

function createTitle(ul){



    let div = createDiv("title")
    let ele = ul.previousSibling
    let flag = true
    let index = 0
    while(flag){

        if (index < 30 && ele.innerHTML != undefined) {

            let tmp = ele;
            ele = ele.previousSibling
            flag = doSome(tmp, div)
        } else {
            ele = ele.previousSibling
        }

        if (ele == undefined ) {
            flag = false
        }
    }

    return div
}


function doSome(tmp, div){

    let content = tmp.innerHTML;

    let flag = containCredit(content)

    if (flag) {

        let credit =  retrieveCredit(content);

        content = removeCredit(content)
        tmp.innerHTML = content;


        data = createQuestionData();
        data.question = content;
        data.credit = credit


        addQuestionData(data)
    }

    div.insertBefore(tmp, div.firstChild)

    return flag;
}




function core(uls){

    let questionDiv = createDiv("question_main")

    for(let i = 0; i < uls.length; i++){

        let wrapper = createDiv("question_wrap")

        let ul =  uls[i];

        let title = createTitle(ul)

        let childs = ul.childNodes;

        console.log(childs.length);

        for (let j = 0; j < childs.length; j++) {
            let node = childs[j];

            if ("li".normalize() === node.nodeName.toLowerCase().normalize()) {

                let content = node.textContent;
                let checkBoxFlag = isCheckBox(content);
                let OptionsFlag = isOptions(content)

                if(checkBoxFlag){

                    let newContent = formatCheckBox(content)

                    if (newContent.length == 0)
                        continue

                    wrapper.append(createCheckBox(newContent));

                } else if (OptionsFlag) {

                    let newContent = formatOption(content)

                    if (newContent.length == 0)
                        continue

                    wrapper.append(createOption(newContent));

                }

            }
        }


        wrapper.insertBefore(title, wrapper.firstChild)
        //document.querySelectorAll("body ul")[0].remove();

        questionDiv.append(wrapper);

    }

    return questionDiv;

}

console.log(response)


function isCheckBox(value){

    let pattern = /^\[ \]/
    return pattern.test(value);
}

function isOptions(value){

    let pattern = /^\( \)/
    return pattern.test(value);
}

//
function containCredit(value){

    let pattern = /&lt;!-- [0-9] --&gt;/
    console.log("contente is" + value)

    return pattern.test(value)
}


function retrieveCredit(value){

    console.log("to retrieve" + value)
    let num = 0;
    let exp = value.match(/&lt;!-- [0-9] --&gt;/)
    console.log("expression is ")
    console.log(exp)
    if ( exp  != null ) {
        credit = exp[0].match(/[0-9]/)

        if ( credit  != null ) {

            num += parseInt(credit[0])
        }
    }

    return num;

}


function matcher(text, pattern){

    let res = text.match(pattern)
    if (res == null ) {
        return '0'
    }

    return rest[0]
}

function removeCredit(value){

    return value.replace(/&lt;!-- [0-9] --&gt;/, "")
}


function formatCheckBox(value){

    return value.replace(/^\[ \]/, "");
}


function formatOption(value){

    return value.replace(/^\( \)/, "");
}


function createCheckBox(value){

    //input
    let input  = document.createElement('input')
    input.setAttribute("class", "form-check-input")
    input.setAttribute("type", "checkbox")
    //input.setAttribute("value", "form-check-checkbox")

    //label
    let label  = document.createElement('label')
    label.setAttribute("class", "form-check-label")
    label.innerHTML= value

    //div
    let div  = document.createElement('div')
    div.setAttribute("class", "form-check")

    div.append(input)
    div.append(label)

    return div;
}


function createOption(value){

    //input
    let input  = document.createElement('input')
    input.setAttribute("class", "form-check-input")
    input.setAttribute("type", "radio")
    input.setAttribute("name", "same")

    //label
    let label  = document.createElement('label')
    label.setAttribute("class", "form-check-label")
    //input.setAttribute("for", "id_")
    label.innerHTML= value

    //div
    let div  = document.createElement('div')
    div.setAttribute("class", "form-check")

    div.append(input)
    div.append(label)

    return div;
}


function createDiv(className){
    let div  = document.createElement('div')
    div.setAttribute("class", className)
    return div
}

function createQuestionData(){

    return {
        question: "",
        actual: [],
        waiting: [],
        credit: 0
    };
}
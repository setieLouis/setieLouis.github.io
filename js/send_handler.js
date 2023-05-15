const send = function (){
    console.log("ciao ciao ciao")
    console.log(allMeta)



}


function checkInput() {

    let complete = true
    allMeta.forEach(meta => {

        if (meta.haveChecked == 0){
            complete = false
            let id = meta.index +'_required';
            document.getElementById(id).style.display='block'
        }
    })
    return complete
}

function save(options, meta) {


    for (let i = 0; i < options.length; i++){
        let curr = options[i]
        if (!curr.checked)
            continue

        meta.userResponse.push(curr.value)
    }


}

function some(){

    try {
        if(!checkInput())
            return false

        for (let i = 0; i < allMeta.length; i++){
            let meta = allMeta[i]
            let options  = document.getElementsByClassName(meta.index + '_frm');
            save(options, meta)
        }

    }
    catch(err) {
       console.log(err)
    }

    console.log(allMeta)

    console.log("??????????????'")

    return false
}


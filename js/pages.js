
const LESSON_PAGE_TYPE = "lesson";
const DEMAND_PAGE_TYPE = "demand";

function pageHandlerEnty(endpoint, callback){

    caller(
        endpoint,
        'GET',
        (data) => pagesHandler(data, callback),
        (error) => console.log(error)
    );
}


const pagesHandler = function(mdDocuments, callback){

    let lessons = []
    let demands = []
    mdDocuments.json().then( metadata => {

        metadata.forEach( data => {

            if (/\d_lesson_/.test(data.name)){

                let d = lessonMetadata(data.name,/\d_lesson_/,data.url)
                lessons.push(d)

            } else if(/\d_demand_/) {

                let d = demandMetadata(name, /\d_demand_/, data.url)
                demands.push(d)
            }
        })
        callback(lessons,demands)
    })
}


function lessonMetadata(name,exp, link) {

    let metadata = createPageMetadata();
    metadata.type= "lesson";
    metadata.index=parseInt(name[0]);
    metadata.title= name.replace(exp, "");
    metadata.link= link;

    return metadata;
}

function demandMetadata(name, exp, link) {

    let metadata = createPageMetadata();
    metadata.type= "demand";
    metadata.index=parseInt(name[0]);
    metadata.title= name.replace(exp, "");
    metadata.link= link;

    return metadata;
}

function createPageMetadata(){
    return {
        type: "",
        index: "",
        title: "",
        link: ""
    }
}
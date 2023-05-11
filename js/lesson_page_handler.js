

const firstPageContentGetter = function (endpoint, callback){

    lessonPageHandler(endpoint, callback);
}

function lessonPageHandler(endpoint, callback){

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


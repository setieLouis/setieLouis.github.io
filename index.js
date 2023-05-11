

document.getElementById('cv').addEventListener('click', function(){
    document.getElementById("overlay").setAttribute('class','overlay y_none' );
    document.getElementById("corpo").setAttribute('class','y_none' );
    overlay(pdfSec('L01.pdf'));
})



document.getElementById("video_cv").addEventListener('click', function () {

    overlay(video('presentation.mp4', 'presentation.webm'));
})



document.getElementById("p1").addEventListener('click', function () {

    caller(
        'https://api.github.com/repos/setieLouis/LAB2_SOL/contents/README.md',
        'GET',
        success,
        (error) => console.log(error));
})








//**************** Overlay *************************************
function overlay(element) {


   //open
   openOverlay();
   closeOverlay(overlay, 'click')
}
function openOverlay() {
    document.getElementById("overlay").style.width = "100%";
}

function closeOverlay(element, event) {
    element.addEventListener(event, function () {

       let overlay =  document.getElementById("overlay");
        overlay.style.width = "0%";
        overlay.setAttribute('class','overlay' );

        let first = document.getElementById("overlay_content").firstChild;
        if(first)
             overlay.removeChild(first);
        document.getElementById("corpo").removeAttribute("class");

    });
}

// Cv overlay body
function pdfSec(src) {

    let  sec =  document.createElement('section');
    sec.setAttribute('class', 'pdf_wrapper');
    let div = document.createElement('div');
    div.setAttribute('class', 'iframe_wrapper');
    let frame = document.createElement('iframe') ;
    frame.setAttribute('src', src + '#page=1&zoom=120');
    frame.setAttribute('width',   '100%');
    frame.setAttribute('height',  '100%');
    frame.setAttribute('style', src + 'border: none;');

    div.append(frame);
    sec.append(div);
      return sec;

    /**
     <div style="width:100%; height: 100%; display: flex; justify-content: center; align-items: center; ">
         <section style="width:90%; height: 90%;  display: flex; justify-content: center; align-items: center; ">
             <iframe id="pdf" src="L01.pdf#page=1&zoom=120" width="100%" height="100%"    style="border: none;"></iframe>
         </section>
     </div>
     */
}

function video( videoMp4, videoWebm) {
    let sec = document.createElement('section');
    sec.setAttribute('class', 'video_wrapper');

    let video = document.createElement('video');
    video.setAttribute('id', 'video-js');
    video.setAttribute('controls', 'true');
    video.setAttribute('preload', 'auto');
    video.setAttribute('width', '800');
    video.setAttribute('height', 'video-js');
    video.setAttribute('data-setup', '{}');

    let src1 = document.createElement('source');
    src1.setAttribute('src', videoMp4);
    src1.setAttribute('type', 'video/mp4');

    let src2 = document.createElement('source');
    src1.setAttribute('src', videoWebm);
    src1.setAttribute('type', 'video/webm');

    let p = document.createElement('p');
    let a = document.createElement('a');
    a.setAttribute('href', 'https://videojs.com/html5-video-support/');
    a.setAttribute('target', '_blank');

    a.append('supports HTML5 video');
    p.append('To view this video please enable JavaScript, and consider upgrading to a\n' +
        ' web browser that');
    p.append(a);
    video.append(src1);
    video.append(src2);
    video.append(p);

    sec.append(video)
    return sec;
}

const success = function(data){
    let resp= data.json()
        .then(data => {
            let sec = document.createElement('section');
            sec.setAttribute('style', 'margin-bottom:20px');  //'markdown-body' )
            let div = document.createElement('div');
            div.setAttribute('class','markdown-body')

            let mkd = utf8Base64Decoder(data.content);
            let body = md.render(mkd);
            console.log(body)
            div.innerHTML = body;
            sec.append(div)

            overlay(sec);
            document.getElementById("corpo").setAttribute('class','y_none' );
        });
};


// attendre la fin du chargement pour initialiser les fcts JS
window.addEventListener('load',function (evt) {
    initialisationJS('Jean');
    document.querySelector('form').addEventListener('submit',formSubmited)

});

function initialisationJS(prenom){
    var jsload=document.querySelector("#jsload");
    jsload.innerHTML='mon <span style="font-weight:900">JS</span> est chargé pour ' + prenom;
    jsload.style.backgroundColor='LIME';
};

function formSubmited(evt) {
    // pour garder le teste dans console log
    evt.preventDefault();
    console.log("Mon formulaire est submited")
    // console.log(evt)
    console.log(evt.target[0].name + "=" + evt.target[0].value);
    console.log(evt.target[1].name + "=" + evt.target[1].value);
    console.log(evt.target[2].name + "=" + evt.target[2].value);
    console.log(evt.target[3].name + "=" + evt.target[3].value);

};
function createPostit(titre,date,heure,description) {
    var postit=document.createElement('div');
    // create class
    postit.classList.add('postit');
    //postitTmp.classList.remove('postit');
    postit.innerHTML='<div class="postit-titre">'+titre+'</div>\
    date: <span class="datetime">'+date+'</span> heure : <span class="datetime">'+heure+'</span>\
    <h2>Description:</h2>'+description;

    var list=document.querySelector('#list');
    list.append(postit)
}
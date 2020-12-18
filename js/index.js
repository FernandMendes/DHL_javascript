// const moment = require("moment");

// attendre la fin du chargement pour initialiser les fcts JS
window.addEventListener('load', function (evt) {
    initialisationJS('Jean');
    document.querySelector('form').addEventListener('submit', formSubmited);
    //createPostit('tutu','2020-12-21','12:12:12','Descritopyion')
    //chargement initial des postit
    // var crud=new Crud(BASE_URL)
    //....
    // ou mieux
    (new Crud(BASE_URL)).recuperer('/postit', function (mesPosTits) {
        console.log('j ai finit de recevoir mes postit:', mesPosTits);
        mesPosTits.forEach(function (postit) {
            console.log(postit);
            //createPostit(postit.titre,postit.datetime.substring(0,10),postit.datetime.substring(12),postit.description);
            createPostitByObject(postit);
        });
    });
});

function initialisationJS(prenom) {
    var jsload = document.querySelector("#jsload");
    jsload.innerHTML = 'mon <span style="font-weight:900">JS</span> est chargé pour ' + prenom;
    jsload.style.backgroundColor = 'LIME';
};

function formSubmited(evt) {
    // pour garder le teste dans console log
    evt.preventDefault();
    console.log("Mon formulaire est submited")
    // console.log(evt)
    // console.log(evt.target[0].name + "=" + evt.target[0].value);
    // console.log(evt.target[1].name + "=" + evt.target[1].value);
    // console.log(evt.target[2].name + "=" + evt.target[2].value);
    // console.log(evt.target[3].name + "=" + evt.target[3].value);


    var postit={
        titre:evt.target[0].value,
        datetime:evt.target[1].value+'T'+evt.target[2].value,
        description:evt.target[3].value
    };
    console.log(postit);
    var monFormulaire = document.forms['editor-form'];
    // var dateFormated=moment(monFormulaire['date'].value,'DD/MM/YYYY')
    (new Crud(BASE_URL)).creer('/postit',postit,function(objsaved) {
        createPostitByObject(objsaved)
    });
    // createPostit(
    //     monFormulaire['title'].value,
    //     monFormulaire['date'].value,
    //     monFormulaire['time'].value,
    //     monFormulaire['description'].value
    // );
};
/**
 * 
 * @param {string} titre titre du post It
 * @param {string} date date YYYY-MM-DD
 * @param {string} heure heure HH:MM:SS
 * @param {string} description desc
 */
function createPostit(titre, date, heure, description) {
    var postit = document.createElement('div');
    // create class
    postit.classList.add('postit');
    //postitTmp.classList.remove('postit');


    postit.innerHTML = '\
    <div class="close"><img src="img/delete.png" style="width: 32px ; height: 32px;"></div>\
    <div class="postit-titre">'+ titre + '</div>\
    date: <span class="datetime">'+ date + '</span> heure : <span class="datetime">' + heure + '</span>\
    <h2>Description:</h2>'+ description;

    // selection de l'image close
    postit.querySelector('.close img').addEventListener('click', deletePostit);

    var liste = document.querySelector('#list');
    liste.append(postit);
}
/**
 * 
 * @param {object} obj the postit 
 */

function createPostitByObject(postitInput) {

    var postit = document.createElement('div');
    postit.id = 'postit-' + postitInput.id;
    // create class
    postit.classList.add('postit');
    //postitTmp.classList.remove('postit');
    postit.addEventListener('dblclick',putinformclickedpostit);

    postit.innerHTML = '\
    <div class="close"><img src="img/delete.png" style="width: 32px ; height: 32px;"></div>\
    <div class="postit-titre">'+ postitInput.titre + '</div>\
    date: <span class="datetime">'+ postitInput.datetime.substring(0, 10) + '\
    </span> heure : <span class="datetime">'+ postitInput.datetime.substring(11) + '</span>\
    <h2>Description:</h2>'+ postitInput.description;

    // selection de l'image close
    postit.querySelector('.close img').addEventListener('click', deletePostit);

    var liste = document.querySelector('#list');
    liste.append(postit);
}
function deletePostit(evt) {
    // evite que d'autre evenements se declenche
    evt.stopPropagation();
    console.log('evenement lier à la suppression', evt);
    //alert('delete called')
    //evt.currentTarget.parentElement.parentElement.remove()
    var domPostitId = evt.path[2].id.substring(7);
    (new Crud(BASE_URL)).supprimer('/postit/' + domPostitId, function () {
        evt.path[2].remove()
    });
    //evt.path[2].remove()
}
function putinformclickedpostit(evt){
    console.log('j\'ai double clicker sur un post it',evt)
    



}
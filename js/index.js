// const moment = require("moment");
// postit index dans db.json
var lastId = 0;
var descripteurDinterval;
// attendre la fin du chargement pour initialiser les fcts JS
window.addEventListener('load', function (evt) {
    initialisationJS('Jean');
    document.querySelector('form').addEventListener('submit', formSubmited);
    document.querySelector('form').addEventListener('reset', formReseted);

    //document.forms['editor-form']['date'].value=(new Date()).toUTCString;
    document.forms['editor-form']['date'].value = (new Date()).toISOString().substring(0, 10);
    //document.forms['editor-form']['time'].value=(new Date()).toISOString().substring(11,16);
    document.forms['editor-form']['time'].value = (new Date()).toTimeString().substring(0, 5);
    //createPostit('tutu','2020-12-21','12:12:12','Descritopyion')
    //chargement initial des postit
    // var crud=new Crud(BASE_URL)
    //....
    // ou mieux

    // remplacer par pullingFunction (effectuer toute les seconde)
    //
    // (new Crud(BASE_URL)).recuperer('/postit', function (mesPosTits) {
    //     console.log('j ai finit de recevoir mes postit:', mesPosTits);
    //     mesPosTits.forEach(function (postit) {
    //         console.log(postit);
    //         //createPostit(postit.titre,postit.datetime.substring(0,10),postit.datetime.substring(12),postit.description);
    //         if (lastId < postit.id) { lastId = postit.id }
    //         createPostitByObject(postit);
    //     });
    // });

    descripteurDinterval = setInterval(pullingFunction, 1000);

});

function initialisationJS(prenom) {
    var jsload = document.querySelector("#jsload");
    jsload.innerHTML = 'mon <span style="font-weight:900">JS</span> est chargé pour ' + prenom;
    jsload.style.backgroundColor = 'LIME';
};

/**
 * 
 * @param {event} evt Called by "Submit"
 */

function formSubmited(evt) {
    // pour garder le teste dans console log
    evt.preventDefault();
    console.log("Mon formulaire est submited")
    // console.log(evt)
    // console.log(evt.target[0].name + "=" + evt.target[0].value);
    // console.log(evt.target[1].name + "=" + evt.target[1].value);
    // console.log(evt.target[2].name + "=" + evt.target[2].value);
    // console.log(evt.target[3].name + "=" + evt.target[3].value);
    var monFormulaire = document.forms['editor-form'];

    var postit = {
        titre: monFormulaire['title'].value,
        datetime: monFormulaire['date'].value + 'T' + monFormulaire['time'].value,
        description: monFormulaire['description'].value
    };
    console.log(postit);
    //var monFormulaire = document.forms['editor-form'];
    // var dateFormated=moment(monFormulaire['date'].value,'DD/MM/YYYY')
    // !== <=> diferent et de type different
    // 
    if (monFormulaire['id'].value !== '') {
        postit.id = monFormulaire['id'].value;
    };
    (new Crud(BASE_URL)).envoiRessource('/postit', postit, function (objsaved) {
        if (undefined !== postit.id) {
            document.querySelector('#postit-' + postit.id).remove();
        }
        createPostitByObject(objsaved)
        monFormulaire.reset();
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
    if (lastId < postitInput.id) { lastId = postitInput.id }
    var postit = document.createElement('div');
    postit.id = 'postit-' + postitInput.id;
    // create class
    postit.classList.add('postit');
    //postitTmp.classList.remove('postit');
    postit.addEventListener('dblclick', putinformclickedpostit);

    postit.innerHTML = '\
    <div class="close"><img src="img/delete.png" style="width: 32px ; height: 32px;"></div>\
    <div class="postit-titre">'+ postitInput.titre +
        '</div>date: <span class="datetime postit-date">' + postitInput.datetime.substring(0, 10) +
        '</span> heure : <span class="datetime postit-heure">' + postitInput.datetime.substring(11) +
        '</span>\
    <h2>Description:</h2><div class="postit-description">'+ postitInput.description + '</div>';

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
function putinformclickedpostit(evt) {
    console.log('j\'ai double clicker sur un post it', evt)
    var postit = evt.currentTarget;
    console.log(
        postit.id.substring(7),
        postit.querySelector('.postit-titre').innerText,
        postit.querySelector('.postit-date').innerText,
        postit.querySelector('.postit-heure').innerText,
        postit.querySelector('.postit-description').innerText,
    );
    document.forms["editor-form"]["title"].value = postit.querySelector('.postit-titre').innerText;
    document.forms["editor-form"]["date"].value = postit.querySelector('.postit-date').innerText;
    document.forms["editor-form"]["time"].value = postit.querySelector('.postit-heure').innerText;
    document.forms["editor-form"]["description"].value = postit.querySelector('.postit-description').innerText;
    document.forms["editor-form"]["id"].value = postit.id.substring(7);

}
/**
 * 
 * @param {*} evt 
 */
const formReseted = (evt) => {
    const form = document.forms['editor-form'];
    for (let i = 0; i < form.length; i++) {
        if (form[i].type !== 'reset' && form[i].type !== 'submit') {
            form[i].value = '';
        };
    };
}
/**
 * 
 */
const pullingFunction = () => {
    (new Crud(BASE_URL)).recuperer('/postit?id_gte=' + (lastId + 1), (listeDesPostIt) => {
        listeDesPostIt.map((element, index, listeOriginel) => {
            lastId = (lastId < element.id ? element.id : lastId);
            createPostitByObject(element);
        });
    });
}

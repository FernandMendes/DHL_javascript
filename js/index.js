function initialisationJS(prenom){
    var jsload=document.querySelector("#jsload");
    jsload.innerHTML='mon <span style="font-weight:900">JS</span> est chargé pour ' + prenom;
    jsload.style.backgroundColor='LIME';
}
initialisationJS('Jean');
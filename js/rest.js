var BASE_URL='http://localhost:5629'

/**
 * 
 * @param {uri} url example: '/postit' (Attention pas url complet)
 */

function get(url) {
    var xhr=new XMLHttpRequest();
    xhr.open('GET',BASE_URL+url)
    xhr.onreadystatechange=function(evt){
        if(evt.currentTarget.readyState < XMLHttpRequest.DONE){return;}
        var objt=JSON.parse(evt.currentTarget.response);
        console.log(objt);
    }
    xhr.send();
};


/**
 * 
 * @param {uri} url chemin du post
 * @param {object} resource data a envoyer
 */
function post(url,resource) {
    var xhr=new XMLHttpRequest();
    xhr.open('POST',BASE_URL+url);
    xhr.setRequestHeader('Content-Type','application/json');
    xhr.setRequestHeader('Accept','application/json');

    xhr.onreadystatechange=function(evt){
        if(xhr.readyState < XMLHttpRequest.DONE){return;}
        var objt=JSON.parse(xhr.response);
        console.log(objt);
    }
    xhr.send(JSON.stringify(resource));
}
//get('/postit/1');

var BASE_URL = 'http://localhost:5629'


/**
 * 
 * @param {str} baseurl path after BASE_URL 
 */
var Crud = function (baseurl) {
    /** get
     * 
     * @param {uri} url example: '/postit' (Attention pas url complet)
     */
    function _get(url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', baseurl + url)
        xhr.onreadystatechange = function (evt) {
            if (evt.currentTarget.readyState < XMLHttpRequest.DONE) { return; }
            var objt = JSON.parse(evt.currentTarget.response);
            console.log(objt);
            callback(objt);
        }
        xhr.send();
    };
    /** post
     * 
     * @param {uri} url chemin du post
     * @param {object} resource data a envoyer
     * @param {function} callback callback function
     */
    function _post(url, resource,callback) {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', baseurl + url);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Accept', 'application/json');

        xhr.onreadystatechange = function (evt) {
            if (xhr.readyState < XMLHttpRequest.DONE || xhr.status != 201 ) { return; }
            var objt = JSON.parse(xhr.response);
            console.log(objt);
            callback(objt);
        }
        xhr.send(JSON.stringify(resource));
    }
    //get('/postit/1');
    /** remove
     * Supress url
     * @param {uri} url delete resource url
     * @param {Function} callback delete resource url
     */

    function _delete(url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open('DELETE', baseurl + url);
        xhr.onreadystatechange = function (evt) {
            if (xhr.readyState < XMLHttpRequest.DONE || xhr.status != 200) { return; }
            callback();
        }
        xhr.send(url);
    }
    /** put
     * update a url
     * @param {uri} url chemin du post
     * @param {object} resource data a envoyer
     */
    function _put(url, resource) {
        var xhr = new XMLHttpRequest();
        xhr.open('PUT', baseurl + url);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Accept', 'application/json');

        xhr.onreadystatechange = function (evt) {
            if (xhr.readyState < XMLHttpRequest.DONE) { return; }
            var objt = JSON.parse(xhr.response);
            console.log(objt);
        }
        xhr.send(JSON.stringify(resource));
    }
    this.recuperer = _get;
    this.creer = _post;
    this.mettreajour = _put;
    this.supprimer = _delete;

}





var BASE_URL='http://localhost:5629'
var Crud=function (baseurl) {
    /** get
     * 
     * @param {uri} url example: '/postit' (Attention pas url complet)
     */
    function get(url,callback) {
        var xhr=new XMLHttpRequest();
        xhr.open('GET',baseurl+url)
        xhr.onreadystatechange=function(evt){
            if(evt.currentTarget.readyState < XMLHttpRequest.DONE){return;}
            var objt=JSON.parse(evt.currentTarget.response);
            console.log(objt);
            callback(objt);
        }
        xhr.send();
    };
    /** post
     * 
     * @param {uri} url chemin du post
     * @param {object} resource data a envoyer
     */
    function post(url,resource) {
        var xhr=new XMLHttpRequest();
        xhr.open('POST',baseurl+url);
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
    /** remove
     * Supress url
     * @param {uri} url delete resource url
     */

    function remove(url) {
        var xhr=new XMLHttpRequest();
        xhr.open('DELETE',baseurl+url);
        xhr.send(url);
    }
    /** put
     * update a url
     * @param {uri} url chemin du post
     * @param {object} resource data a envoyer
     */
    function put(url,resource) {
        var xhr=new XMLHttpRequest();
        xhr.open('PUT',baseurl+url);
        xhr.setRequestHeader('Content-Type','application/json');
        xhr.setRequestHeader('Accept','application/json');

        xhr.onreadystatechange=function(evt){
            if(xhr.readyState < XMLHttpRequest.DONE){return;}
            var objt=JSON.parse(xhr.response);
            console.log(objt);
        }
        xhr.send(JSON.stringify(resource));
    }
    this.recuperer=get;
    this.creer=post;
    this.mettreajour=put;
    this.supprimer=remove;

}





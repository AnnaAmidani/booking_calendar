

var xhr = new XMLHttpRequest();
var oauthToken = gapi.auth.getToken();
xhr.open('GET',
  'https://www.googleapis.com/plus/v1/people/me/activities/public');
xhr.setRequestHeader('Authorization',
  'Bearer ' + oauthToken.access_token);
xhr.send();



/** Handle cors on all browsers ;-) Thanks to C.Zackas: https://www.nczonline.net/blog/2010/05/25/cross-domain-ajax-with-cross-origin-resource-sharing/ **/
function createCORSRequest(method, url){
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr){
        xhr.open(method, url, true);
    } else if (typeof XDomainRequest != "undefined"){
        xhr = new XDomainRequest();
        xhr.open(method, url);
    } else {
        xhr = null;
    }
    return xhr;
}

/** Handle cors on all browsers with auth token - Anna's customization from original C.Zackas **/
function createAuthCORSRequest(method, url, oauthToken){
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr){
        xhr.open(method, url, true);
        xhr.setRequestHeader('Authorization', 'Bearer ' + oauthToken.access_token)
    } else if (typeof XDomainRequest != "undefined"){
        xhr = new XDomainRequest();
        xhr.open(method, url);
        xhr.setRequestHeader('Authorization', 'Bearer ' + oauthToken.access_token)
    } else {
        xhr = null;
    }
    return xhr;
}

var request = createCORSRequest("get", "http://www.nczonline.net/");
if (request){
    request.onload = function(){
        //do something with request.responseText
    };
    request.send();
}

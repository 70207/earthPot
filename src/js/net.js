var _url;

function setBaseUrl(url){
    _url = url;
}

function AjaxPost(url, params, callback){
    var http = new XMLHttpRequest();

    http.open("POST", "http://"+_url+"/"+url, true);

    http.setRequestHeader("Content-type", "application/json");

    http.onreadystatechange = function() {//Call a function when the state changes.
        if(http.readyState == 4 && http.status == 200) {
            var str = http.responseText;  
            callback(str);
        }
    }
    http.send(params);
}



function AjaxGet(url, params, callback){
    var http = new XMLHttpRequest();

    http.open("GET", "http://"+_url+"/"+url, true);

    http.setRequestHeader("Content-type", "application/json");

    http.onreadystatechange = function() {//Call a function when the state changes.
        if(http.readyState == 4 && http.status == 200) {
            var str = http.responseText;  
            callback(str);
        }
    }
    http.send(params);
}
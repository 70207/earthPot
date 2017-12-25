var client = {id:1, x:100, y:200};
var proxy = {id:10, x:300, y:200};
var servers = [
    {id:100, x:500, y:50},
    {id:101, x:700, y:100},
    {id:102, x:700, y:300},
    {id:103, x:600, y:400},
    {id:104, x:400, y:500}
];
function createClient(){
    earth.newPot(client.id, "client", {x:client.x, y:client.y});
}

function createProxy(){
    
    earth.newPot(proxy.id, "proxy", {x:proxy.x, y:proxy.y});
}

function createServer(){

    var len = servers.length;
    for(var i = 0; i < len; ++i){
        var server = servers[i];
        earth.newPot(server.id, "server", {x:server.x, y:server.y});
    }
}

function linkClientProxy(func){
    earth.link(client.id, proxy.id, "req", func)
}

function linkProxyClient(func){
    earth.link(proxy.id, client.id, "response", func)
}

function linkProxyServer(func){
    var len = servers.length;
    var fi = 0;
    function _cf(){
        ++fi;
        if(fi == len){
            func();
        }
    }

    for(var i = 0; i < len; ++i){
        var server = servers[i];
        earth.link(proxy.id, server.id, "request", _cf);
    }
}

function linkServerProxy(func){
    var len = servers.length;
    var fi = 0;
    function _cf(){
        ++fi;
        if(fi == len){
            func();
        }
    }
    for(var i = 0; i < len; ++i){
        var server = servers[i];
        earth.link(server.id, proxy.id, "data", _cf);
    }
}

function skipLimit(func){
    var len = servers.length;
    var fi = 0;
    function _cf(){
        ++fi;
        if(fi == len){
            func();
        }
    }
    for(var i = 0; i < len; ++i){
        var server = servers[i];
        earth.skipLimit(server.id, _cf);
    }
}

function skipLimtProxy(func){
    earth.skipLimit(proxy.id, func, 200);
    
}

createClient();
createProxy();
createServer();

function linkFirst(){
    // var arr = [linkClientProxy, linkProxyServer];
    // listFunc(arr);
    var _state = 1; //client to proxy
    var pid;

    function lcp(){
        _state++;
    }

    function checkState(cur){
        switch(_state){
            case 1://client to proxy
            break;
            case 2://client to proxy finish
            linkProxyServer(lcp);
            _state++;
            case 3://proxy to server finish
            break;
            case 4://skipLimit
            skipLimit(lcp);
            _state++;
            break;
            case 5:
            break;

            case 6://proxy to server
            linkServerProxy(lcp); 
            _state++;
            break;
            
            case 7://server to proxy
            break;
            case 8: //skip proxy
            skipLimtProxy(lcp);
            _state++;
            break;
            case 9:
            break;
            case 10://proxy to client
            linkProxyClient(lcp);
            _state++;
            break;
            case 11://proxy to client finish
            removeProcessEvent(pid);
            _state++;
            break;
            case 12://error
            break;

        }
       
    }
    pid = addProcessEvent(checkState);
    linkClientProxy(lcp);
    

}

linkFirst();

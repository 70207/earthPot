
function startBC(k, n){
    topkn(k,n, bcCallback);
}

function cleanBC(){

}

function bcCallback(sort_id){
    bcCycle(sort_id);
}

function bcLink(type, src, dst){
    earth.checkPot(src, src);
    earth.checkPot(dst, dst);

    earth.link(src, dst);
}

function bcCycle(sort_id){
    var pid;


    var bcState = 1; //state

    function bcAction(actions, state){
        var len = actions.length;
        for(var i = 0; i < len; ++i){
            var action = actions[i]; //{type, piece_src, piece_dst}
            bcLink(action.type, action.piece_src, action.piece_dst);
        }

        if(state == "ok"){
            bcState = 2;
        }
    }

    function bcResult(results){
        $("txtView").innerText = results;
        removeProcessEvent(pid);
    }

    function bcStep(cur){
        if(bcState == 1){
            knstate(sort_id, bcAction);
        }
        else if(bcState == 2){
            knresult(sort_id, bcResult);
            bcState = 3;
        }
    
    }

    pid = addProcessEvent(bcStep);
        
}

function topkn(k,n, callback){
    var url = "topkn";
    var params = "k="+k+"&n="+n;  

    function _f(str){
        var data = JSON.parse(str);
        if(data.data == null){
            console.log("topkn failed");
            return;
        }

        var sort_id = data.data.sort_id;

        if(sort_id == null){
            console.log("topkn failed, nort sort id");
            return;
        }

        callback(sort_id);
    }  

    AjaxPost(url, params, _f);
}

function knstate(sort_id, fun){
    var url = "getstate&sort_id=" + sort_id;
    function _f1(str){
        var data = JSON.parse(str);

        fun(data.actions, data.state);
    }

    AjaxGet(url, null, _f1);

}

function knresult(sort_id, fun){
    var url = "getresult&sort_id=" + sort_id;
    function _f1(str){

        fun(str);
    }

    AjaxGet(url, null, _f1);
}

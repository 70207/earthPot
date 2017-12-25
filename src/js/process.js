var _in_process = false;

var _process_events = [];
var _to_process_events = [];

var _to_pi = 0;
var _p_i = 0;


var _remove_pro_events = [];
var _r_pi = 0;

var _process_iid = 0;

var _processed = false;

function startProcess(){

    if(_processed){
        return;
    }

    _processed = true;

    step();

    function  step(){

        var cur = new Date().getTime();
        _in_process = true;

        for(var i = 0; i < _p_i; ++i){
            _process_events[i].fun(cur);
        }


        _in_process = false;

        _addAllProEvents();
        _removeAllProEvents();
        requestAnimationFrame(step);
    }

}

function addProcessEvent(ff){
    _process_iid++;

    var pro = {id:_process_iid, fun:ff};

    if(_in_process){
        _to_process_events.push(pro);
        _to_pi++;
    }
    else{
        _process_events.push(pro);
        _p_i++;
    }

    return _process_iid;

}




function removeProcessEvent(id){
    if(_in_process){
        _remove_pro_events.push(id);
        _r_pi++;
    }
    else{
        _removeProEvent(id);
    }
}

function _removeProEvent(id){
    for(var i = 0; i < _p_i; ++i){
        if(_process_events[i].id == id){
            _process_events.splice(i, 1);
            _p_i--;
            return;
        }
    }
}

function _removeAllProEvents(){
    if(_r_pi <=0){
        return;
    }

    for(var i = 0; i < _r_pi; ++i){
        _removeProEvent(_remove_pro_events[i]);
    }

    while(_remove_pro_events.length){
        _remove_pro_events.pop();
    }

    _r_pi = 0;
}


function _addAllProEvents(){
    if(_to_pi <= 0){
        return;
    }

    for(var i = 0; i < _to_pi; ++i){
        _process_events.push(_to_process_events[i]);
        _p_i++;
    }

    while(_to_process_events.length){
        _to_process_events.pop();
    }

    _to_pi = 0;
}
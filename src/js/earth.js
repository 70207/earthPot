function $(id){
    return document.getElementById(id);
}

function $$(id){
    return document.getElementById(id).value;
}

function createEarth(id, pos, size, linkSpeed){
    return createUnSafe(id, pos, size, linkSpeed);
}


function createUnSafe(id, pos, size, linkSpeed){
    _earth = {};
    _earth.id = id;
    _earth.size = size;
    _earth.pos = pos;
    _earth.linkSpeed = linkSpeed;
    _earth.canvas = $(id);
    _earth.linkings = {}

    _earth.setBGC = function(color){
        var ctx = this.canvas.getContext("2d");
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, size.w, size.h);
    }

    _earth.newPot = function(id, title, pos, size) {
        var pot = {};
        pot.id = id;
        pot.pos = pos;
        pot.size = size;

        this[id] = pot;

        var ctx = this.canvas.getContext("2d");
        ctx.fillStyle = "#4499ff";
        ctx.font = "20px Courier New";
    
      

        ctx.fillRect(pos.x, pos.y, size.w, size.h);

        ctx.fillStyle = "orange";
        ctx.textAlign="center";
        ctx.fillText(id, pos.x + size.w / 2, pos.y + size.h / 2);
        ctx.fillText(title, pos.x + size.w / 2, pos.y + size.h + 30);

        
    }


    _earth.link = function(srcID, dstID) {
        var potSrc = this[srcID];
        var potDst = this[dstID];

        if(potSrc == null){
            console.log("add src is null, id:%s", srcID);
            return;
        }
        if(potDst == null){
            console.log("add dst is null, id:%s", dstID);
            return;
        }

        var src = {x:potSrc.pos.x, y:potSrc.pos.y};
        var dst = {x:potdST.pos.x, y:potDst.pos.y};

        var links = {
            s:src,
            d:dst
        }

        
    }

    _earth.release = function() {

        if (canvas == null) {
            return;
        }
        canvas.clearRect(pos.x, pos.y, size.width, size.height);
    }

    _earth.draw = function(){

        requestAnimationFrame(_earth.draw);
    }

    return _earth;
}












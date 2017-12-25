function $(id){
    return document.getElementById(id);
}

function $$(id){
    return document.getElementById(id).value;
}

function createEarth(backView, potView, linkView, size, linkSpeed){
    return createUnSafe(backView, potView, linkView, size, linkSpeed);
}


function createUnSafe(backView, potView, linkView, size, linkSpeed){
    _earth = {};
    _earth.backView = backView;
    _earth.potView = potView;
    _earth.linkView = linkView;
    _earth.size = size;
    _earth.linkSpeed = linkSpeed;
    _earth.linkings = {}

    var posx = 100;
    var posy = 200;

   

    _earth.setBGC = function(color){
        var ctx = $(backView).getContext("2d");


        ctx.fillStyle = color;
        ctx.fillRect(0, 0, size.width, size.height);
        _earth.bgc = color;
    }


    _earth.checkPot = function(id, title){
        if(this[id] != null){
            return;
        }

        var pos = {x:posx, y:posy};

        this.newPot(id, title, pos);

        if(posy > 800){
            posy = 200;
            posx += 200;
        }

    }

    _earth.newPot = function(id, title, pos) {
        var pot = {};
        var _sz = { width: 60, height: 60 };
        pot.id = id;
        pot.pos = Object.assign({}, pos);
    
        pot.cpos = {x:pos.x + _sz.width /2, y:pos.y + _sz.height/2 };
        pot.size = _sz;

        this[id] = pot;

        var ctx = $(potView).getContext("2d");
        ctx.fillStyle = "#4499ff";
        ctx.font = "20px Courier New";
    
      

        ctx.fillRect(pos.x, pos.y, _sz.width, _sz.height);

        ctx.fillStyle = "orange";
        ctx.textAlign="center";
        ctx.fillText(id, pos.x + _sz.width / 2, pos.y + _sz.height / 2);
        ctx.fillText(title, pos.x + _sz.width / 2, pos.y + _sz.height + 30);

        
    }

    function clear(_earth){
        function _clear(){
            var ctx = $(linkView).getContext("2d");
            ctx.clearRect(0, 0, _earth.size.width, _earth.size.height );

        //     ctx.beginPath();
        //     ctx.fillStyle="#ff0000";
        //    // ctx.lineWidth = 3;
        //     ctx.textAlign = "center";
        //     ctx.font='50px serif';
        //     ctx.fillText("get data, skip, limit",300, 300);
            
        //     ctx.stroke();
        }

        addProcessEvent(_clear);
    }

     clear(_earth);





    _earth.skipLimit = function(id, finishFunc, height){
        var pot = this[id];
        var __earth = _earth;

        if(pot == null){
            console.log("pot is null, id:%s", srcID);
            return;
        }

        var showTime = 0;
        var pid;
        var bitrate = 0;
        var _skh = 20;
        var _lmh = 50;
        
        function _cycle(cur){
            if(showTime == 0){
                showTime = cur;
            }

            _show();
            bitrate = (cur - showTime)/ 1000;
            if(cur - showTime > 1000){
                removeProcessEvent(pid);
                finishFunc();
            }
        }

        function _showText(){
            var ctx = $("linkView").getContext("2d");
           
            ctx.save();
            ctx.beginPath();
            ctx.fillStyle="#ff0000";
            ctx.textAlign = "center";
            ctx.font='30px serif';
            ctx.fillText("get data, skip, limit", pot.pos.x + 200, pot.pos.y + 10);
            
            ctx.stroke();
          //  ctx.restore();
            
            
        }

        function _showScroll(){
            var ctx = $("linkView").getContext("2d");
           
            ctx.save();
            ctx.beginPath();
            ctx.fillStyle = "#ee99aa";
            ctx.fillRect(pot.pos.x + 100, pot.pos.y, 100, 100);
            ctx.fillStyle="#ff0000";
            ctx.fillRect(pot.pos.x + 100, pot.pos.y, 100, 100 * bitrate);
            
            ctx.stroke();
          //  ctx.restore();
            
            
        }

        function _show(){
            var ctx = $("linkView").getContext("2d");
           
            ctx.save();
            ctx.beginPath();
            ctx.fillStyle = "#ee99aa";
            var _ht = 100;
            if(height != null){
                _ht = height;
            }
            ctx.fillRect(pot.pos.x + 100, pot.pos.y, 100, _ht);
            ctx.fillStyle="#ff0000";
            ctx.fillRect(pot.pos.x + 100, pot.pos.y + _skh, 100, _lmh);
            
            ctx.stroke();

            ctx.beginPath();
            ctx.fillStyle="#ff0000";
            ctx.textAlign = "center";
            ctx.font='20px serif';
            ctx.fillText("skip", pot.pos.x + 220, pot.pos.y +  _skh + 10);
            ctx.fillText("limit", pot.pos.x + 220, pot.pos.y + (_lmh + _skh)/2 + 20);

            ctx.stroke();


          //  ctx.restore();
            
            
        }
        
        
        pid = addProcessEvent(_cycle);
    }

    _earth.link = function(srcID, dstID, title, finishFunc) {
        var potSrc = this[srcID];
        var potDst = this[dstID];

        var __earth = _earth;
        if(potSrc == null){
            console.log("add src is null, id:%s", srcID);
            return;
        }
        if(potDst == null){
            console.log("add dst is null, id:%s", dstID);
            return;
        }

        var src = {x:potSrc.cpos.x, y:potSrc.cpos.y};
        var dst = {x:potDst.cpos.x, y:potDst.cpos.y};

        var links = {
            s:src,
            d:dst
        }

        var px = src.x;
        var py = src.y;

        var dtx = (dst.x - src.x)/40;
        var dty = (dst.y - src.y)/40;

        var midx = (src.x + dst.x)/2;
        var midy = (src.y + dst.y)/2;

        var _id = 0;



        var func = function(cur){
            var __dt = px - dst.x;
            if(Math.abs(__dt) <= 0.1){
                removeProcessEvent(_id);
                if(finishFunc != null){
                    finishFunc();
                }
                return;
            }
            _draw();
        }

        function _draw(){
            var ctx = $(linkView).getContext("2d");
           
            ctx.beginPath();
            ctx.strokeStyle="#8888ee";
            ctx.lineWidth = 3;
            ctx.moveTo(src.x, src.y);
            var _x = px + dtx;
            var _y = py + dty;

            ctx.lineTo(_x, _y);

            px = _x;
            py = _y;

            ctx.stroke();

            if (title != null) {
                ctx.fillStyle = "#ff0000";
                ctx.textAlign = "center";
                ctx.font = '20px serif';
                ctx.fillText(title, midx, midy);

                ctx.stroke();
            }
        }


        _id = addProcessEvent(func);

        
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












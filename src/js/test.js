

function testPot() {
    var pos = {};
    

    var id = "101";
    var title = "service";
    pos.x = 100;
    pos.y = 300;
    earth.newPot(id, title, pos);

    pos.x = 700;
    pos.y = 200;
    id = "23";
    title = "server";
    earth.newPot(id, title, pos);


    pos.x = 400;
    pos.y = 30;
    id = "33";
    title = "server";
    earth.newPot(id, title, pos);


    id = "43";
    title = "server";
    pos.x = 400;
    pos.y = 500;
    earth.newPot(id, title, pos);

    
    earth.link("101", "23");


}


testPot();
var size = {
    width: 800,
    height: 1000,
}

var bv = document.getElementById("backView");
var pv = document.getElementById("potView");
var lv = document.getElementById("linkView");

if (browser.isMobile()) {
    size = {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight
    };

}
else {
    $("yeskey").style.margin = "auto";
    $("yeskey").style.top = 100;
    $("yeskey").style.left = 0;
    $("yeskey").style.right = 0;
    $("yeskey").style.bottom = 0;
    $("yeskey").style.display= "block";

    $("tima").style.margin = "auto";
    $("tima").style.top = 100;
    $("tima").style.left = 0;
    $("tima").style.right = 0;
    $("tima").style.bottom = 0;
    $("tima").style.display= "block";

    $("gaga").style.margin = "auto";
    $("gaga").style.top = 100;
    $("gaga").style.left = 0;
    $("gaga").style.right = 0;
    $("gaga").style.bottom = 0;
    $("gaga").style.display= "block";

    $("nina").style.margin = "auto";
    $("nina").style.top = 100;
    $("nina").style.left = 0;
    $("nina").style.right = 0;
    $("nina").style.bottom = 0;
    $("nina").style.display= "block";

}

var earth = null;
var linkSpeed = 20;





$("yeskey").style.width = size.width;
$("yeskey").style.height = size.height;

$("tima").style.width = size.width;
$("tima").style.height = size.height;

$("gaga").style.width = size.width;
$("gaga").style.height = size.height;

$("nina").style.width = size.width;
$("nina").style.height = size.height;

bv.width = size.width;
bv.height = size.height;

pv.width = size.width;
pv.height = size.height;
lv.width = size.width;
lv.height = size.height;


function myEarth() {
    earth = new createEarth("backView", "potView", "linkView", size, linkSpeed);
    earth.setBGC("#22ffdd");
}


myEarth();






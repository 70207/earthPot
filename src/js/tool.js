var browser={ 

    versions: function () {

        var u = navigator.userAgent, app = navigator.appVersion;

        return {

            trident: u.indexOf('Trident') > -1, //ie

            presto: u.indexOf('Presto') > -1, //opera

            webKit: u.indexOf('AppleWebKit') > -1, //webkit

            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //firfox

            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //mobile

            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios 

            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android

            iPhone: u.indexOf('iPhone') > -1, //iphone

            iPad: u.indexOf('iPad') > -1, //iPad 

            webApp: u.indexOf('Safari') == -1 //webapp

        }; 


    }(),

    isMobile: function(){
        return !!(this.versions.mobile || this.versions.ios || this.versions.android || this.versions.iPad || this.versions.iPhone);
    },

    language: (navigator.browserLanguage || navigator.language).toLowerCase() 

};



function $(d){
    return document.getElementById(d);
}

function $$(d){
    return document.getElementById(d).value;
}

function sti(id) {
    return Number($$(id));
}
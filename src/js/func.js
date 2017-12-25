function listFunc(arr){
    var i = 0;
    var len = arr.length;

    function _llf() {
        if (i == arr.length) {
            return;
        }


        var _lk = arr[i];
        ++i;
        _lk(_llf);
    }

    _llf();
}
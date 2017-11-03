var Event = (function () {

    var Event = {},
        _eventlist = {},
        SELECTOR = "[action-type]";
    function _getActionName(elem) {
        var actionname = elem.attr("action-type") || null;
        if(!actionname){

        }
        return actionname;
    }
    function _init() {
        var $wrapper = $(document.body || document.documentElement)

        $wrapper.on('click', SELECTOR, function (e) {
            var event = e || window.event;
            event.preventDefault();

            var $elem = $(this)
            var actionName = _getActionName($elem);
            _handle(actionName, this);
            return false;
        })

    }
    //添加事件
    /**
     *
     * @param actionSet {Object} 事件集合
     * @private
     */
    function _add(actionSet) {

        $.each(actionSet, function (key, value) {

            if(typeof value !==  "function"){
                console.warn("It's not function");
                return;
            }

            if(_eventlist[key]){
                console.warn("It's existing");
            }
            _eventlist[key] = value;
        })
    }

    function _handle(actionname,context) {
        var fn;

        if(typeof actionname !== "string"){
            console.warn("It's not string");
            return;
        }

        fn = _eventlist[actionname] || null;

        if(fn && typeof fn ===  "function"){
            return fn.call(context || window);
        }
    }

    _init();
    Event.getActionName =_getActionName;
    Event.add = _add;
    Event.handle = _handle;

    return Event;
})();

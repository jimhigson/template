module.exports = function fireEventOnScaleChange(bus, scale, methodName, eventName){

    var originalMethod = scale[methodName];

    scale[methodName] = function(){
        var r = originalMethod.apply(this, arguments);

        if (arguments.length) {
            bus.emit(eventName);
        }
        return r;
    };
};
module.exports = {
    translateXY: function translateXY(x,y) {
        return 'translate(' + x + ',' + y + ')';
    },

    translateX: function translateX(x) {
        return 'translate(' + x + ')';
    },

    scale: function scale(s){
        return 'scale(' + s + ')';
    }
};
function pairExtent(pair) {
    return pair[1] - pair[0];
}

function interpolateBetweenPair(pair, proportion) {
    return pair[0] + proportion * pairExtent(pair);
}

function expandPair(pair, amount) {
    var extent = pairExtent(pair);
    var expansionAmount = extent * amount;
    return [pair[0] - expansionAmount, pair[1] + expansionAmount];
}

function positiveOnly(pair) {
    return [Math.max(pair[0], 0), pair[1]];
}

module.exports = {
    pairExtent : pairExtent,
    interpolateBetweenPair: interpolateBetweenPair,
    expandPair: expandPair,
    positiveOnly: positiveOnly
}

function pairExtent(pair) {
    return pair[1] - pair[0];
}

function interpolateBetweenPair(pair, proportion) {
    return pair[0] + proportion * pairExtent(pair);
}

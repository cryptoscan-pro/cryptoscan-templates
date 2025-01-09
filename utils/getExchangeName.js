function getExchangeName(name) {
    switch(name.toLowerCase()) {
        case "mxc": {
            return "mexc";
        }
        case "unknown": {
            return "DEX"
        }
        default:
            return name.replace('#', '');
    }
}
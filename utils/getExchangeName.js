export function getExchangeName(name) {
    switch(name.toLowerCase()) {
        case "mxc": {
            return "MEXC";
        }
        case "huobi": {
            return "HTX";
        }
        case "unknown": {
            return "DEX"
        }
        default:
            return name.replace('#', '').toUpperCase();
    }
}
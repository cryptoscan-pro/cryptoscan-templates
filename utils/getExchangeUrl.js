export function getExchangeUrl(exchange, to, from) {
    switch (exchange.toLowerCase()) {
        case "bybit": {
            return `https://www.bybit.com/ru-RU/trade/spot/${to}/${from}`;
        }
        case "bybit-futures": {
            return `https://www.bybit.com/ru-RU/trade/usdt/${to}${from}`;
        }
        case "gateio": {
            return `https://www.gate.io/ru/trade/${to}_${from}`;
        }
        case "gateio-futures": {
            return `https://www.gate.io/ru/futures/USDT/${to}_${from}`;
        }
        case "binance": {
            return `https://www.binance.com/ru/trade/${to}_${from}`;
        }
        case "binance-futures": {
            return `https://www.binance.com/ru/futures/${to}${from}`;
        }
        case "mexc": {
            return `https://mexc.co/ru-RU/exchange/${to}_${from}`;
        }
        case "mexc-futures": {
            return `https://futures.mexc.com/ru-RU/exchange/${to}_${from}`;
        }
        case "htx": {
            return `https://www.htx.com/ru-ru/trade/${to.toLowerCase()}_${from.toLowerCase()}?type=spot`;
        }
        case "kucoin": {
            return `https://www.kucoin.com/ru/trade/${to}-${from}`;
        }
        case "bitmex": {
            return `https://www.bitmex.com/app/trade/${to}_${from}`;
        }
        case "lbank": {
            return `https://www.lbank.com/trade/${to.toLowerCase()}_${from.toLowerCase()}`;
        }
        case "cex": {
            return `https://cex.io/prices/${from}`;
        }
        case "bitmart": {
            return `https://www.bitmart.com/trade/en-US?symbol=${to}_${from}`;
        }
        case "poloniex": {
            return `https://poloniex.com/trade/${to}_${from}/?type=spot`;
        }
        case "ascendex": {
            return `https://ascendex.com/ru/cashtrade-spottrading/${to}/${from}`;
        }
        case "digifinex": {
            return `https://www.digifinex.com/ru-ru/trade/${to}/${from}`;
        }
        case "okx": {
            return `https://www.okx.com/ru/trade-spot/${to}-${from}`;
        }
        case "bitget": {
            return `https://www.bitget.com/ru/spot/${to}${from}`;
        }
        case "bitget-futures": {
            return `https://www.bitget.com/ru/futures/usdt/${to}${from}`;
        }
        case "coinex": {
            return `https://coinex.com/en/exchange/${to}-${from}`;
        }
        case "coinex-futures": {
            return `https://www.coinex.com/en/futures/${to}-${from}`;
        }
        case "bitmex": {
            return `https://www.bitmex.com/app/trade/${to}${from}`;
        }
        case "bitmex-futures": {
            return `https://www.bitmex.com/app/trade/${to}${from}`;
        }
        case "bingx": {
            return `https://bingx.com/en/spot/${to}${from}/`
        }
        case "coinbase": {
            return `https://exchange.coinbase.com/trade/${to.toUpperCase()}-${from.toUpperCase()}`
        }
        default: {
            return `https://cryptoscan.pro`;
        }
    }
}
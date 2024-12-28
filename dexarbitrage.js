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
        default: {
            return `https://cryptoscan.pro`;
        }
    }
}

function getExchangeName(name) {
    switch(name.toLowerCase()) {
        case "mxc": {
            return "mexc";
        }
        default:
            return name;
    }
}

function getBigNumber(value) {
    if (typeof value !== 'number') {
        return '0';
    }

    const suffixes = ['', 'K', 'M', 'B'];
    let index = 0;

    while (value >= 1000 && index < suffixes.length - 1) {
        value /= 1000;
        index++;
    }

    return `${value.toFixed(1).replace(/\.0$/, '')}${suffixes[index]}`;
}

function getVariantIcon(v) {
    switch(v) {
        case "dex-cex":
            return "🔗🏦"
        case "cex-cex":
            return "🏦🏦"
        case "cex-dex":
            return "🏦🔗"
        case "futures-futures":
            return "📊📊"
        case "futures-cex":
            return "📊🏦"
        case "cex-futures":
            return "🏦📊"
        case "dex-futures":
            return "🔗📊"
        case "futures-dex":
            return "📊🔗"
    }
}

export default function(data) {
    const symbol = getVariantIcon(data.variant);
    const secondSymbol = '🚨';
    const spread = data.spread || (data.buyPriceTo / data.buyPriceFrom * 100 - 100);
    const dexScreenerUrl = `https://dexscreener.com/search?q=${data.contract}`;
    const coinMarketCapUrl = `https://coinmarketcap.com/community/search/latest/?q=${data.contract}/`;
    return `${symbol} **${data.variant.toUpperCase()}** #${data.symbol} **$${getBigNumber(data.totalBuyUSD)}** (+${spread.toFixed(1)}%) from [${getExchangeName(data.exchangeFrom)}](${getExchangeUrl(getExchangeName(data.exchangeFrom), data.symbol, 'USDT')}) to [${getExchangeName(data.exchangeTo)}](${getExchangeUrl(getExchangeName(data.exchangeTo), data.symbol, 'USDT')})\n${secondSymbol} #${data.network} #${data.exchangeFrom} #${data.exchangeTo} #${data.contract.slice(0, 5)}\n[DexScreener](${dexScreenerUrl}) | [CM](${coinMarketCapUrl})`
}
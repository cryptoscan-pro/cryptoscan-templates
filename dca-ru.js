import { getBigNumber } from "./utils/getBigNumber";

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
            return `https://cryptoscan.pro/swap`;
        }
    }
}

export function getAgo(date) {
	const now = new Date();
	const milliseconds = now.getTime() - date.getTime();

	const intervals = {
		year: 31536000000,
		month: 2592000000,
		day: 86400000,
		hour: 3600000,
		minute: 60000,
		s: 1000,
		ms: 1,
	};

	for (const [unit, value] of Object.entries(intervals)) {
		const interval = Math.floor(milliseconds / value);
		if (interval >= 1) {
			return `${interval}${unit} ago`;
		}
	}

	return `${milliseconds}ms ago`;
}

export default function(data) {
    const label = data.change > 0 ? '📉' : '📈';
    const type = data.change > 0 ? 'растет' : 'падает';
    const symbol = data.symbol?.replace('#', '').replace('$', '').toUpperCase();
    const dexScreenerUrl = `https://dexscreener.com/search?q=${(data.contract || symbol).replaceAll(' ', '')}`;
    const coinMarketCapUrl = `https://coinmarketcap.com/community/search/latest/?q=${(data.contract || symbol).replaceAll(' ', '')}/`;
    const reference = data.reference ? `#${data.reference}` : '';
    const contract = data.contract ? (data.contract.startsWith('http') ? data.contract : `#${data.contract?.replace('-', '')?.replace(' ', '')}`) : ''
    const amount = !!data?.amount ? (getBigNumber(data.amount) + ' ') : '';
    const repeat = data.duration ? ` (повторяется: ${data.duration})` : '';
    const interval = data.interval ? ` за ${data.interval}${repeat}` : ''
    return `️${label} DCA: #${symbol} ${type} на ${data.change}%${interval} #${data.symbol} ${amount}#${symbol}\n${getAgo(new Date(data.createdAt))} ${reference} ${contract}\n[DEX Screener](${dexScreenerUrl}) | [CoinMarketCap](${coinMarketCapUrl})`
}
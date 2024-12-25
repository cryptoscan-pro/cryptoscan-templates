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

function parsePriceChanges(obj) {
    const regex = /^volumeChange(\d+)([smh])$/;
    const results = [];

    for (const key in obj) {
        const match = key.match(regex);
        if (match) {
            const number = match[1]; // Число из ключа
            const interval = match[2]; // Интервал из ключа
            const value = obj[key]; // Значение из объекта

            // Преобразуем интервал в текст
            let intervalText;
            switch (interval) {
                case 's':
                    intervalText = 'sec';
                    break;
                case 'm':
                    intervalText = 'min';
                    break;
                case 'h':
                    intervalText = 'h';
                    break;
                default:
                    continue;
            }

            // Формируем текст для одного параметра
            results.push({ text: `${value.toFixed(1)}% in ${number} ${intervalText}`, absValue: Math.abs(value) });
        }
    }

    // Сортируем по убыванию абсолютных значений
    results.sort((a, b) => b.absValue - a.absValue);

    // Возвращаем только текст
    return results.map(result => result.text);
}

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

export default function (data) {
    const changes = parsePriceChanges(data)
    const emoji = changes[0].startsWith('-') ? '🌧' : '🌈';
    const type = changes[0].startsWith('-') ? 'low interest' : 'high interest';
    return `${emoji} #${data?.symbol} ${type} ${changes[0]} in [${data?.exchange}](${getExchangeUrl(data?.exchange, data.symbol.toLowerCase().replace('usdt', ''), 'usdt')})\nP: ${data?.price} 24h: ${getBigNumber(data.volume)} USDT (${getAgo(new Date(data.createdAt))})\n${changes.slice(1).join(', ')}\n`
} 
import { getExchangeUrl } from "./utils/getExchangeUrl";
import { getBigNumber } from "./utils/getBigNumber";

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
    const isExchange = data.from.length > 12 || data.to.length > 12;
    const isDeposit = (isExchange && data.from.length > 12) ? true : false 
    const isWithdraw = (isExchange && data.from.length > 12) ? true : false 
    const transferSymbol = isDeposit ? '📥' : isWithdraw ? '📤' : '💸'
        
    const exchangeSymbol = isExchange ? '🏦' : '';
    const symbol = data.symbol.replace('#', '').toUpperCase();
    const exchange = data.exchange.replace('-', '').toLowerCase();
    return `${exchangeSymbol}${transferSymbol} отправляется ${getBigNumber(data.amount)} #${symbol} из ${data.from || data.exchange} в ${data.to || data.exchange} ([${exchange}](${getExchangeUrl(exchange, symbol, 'USDT')}))\n${getAgo(new Date(data.createdAt))}`
}
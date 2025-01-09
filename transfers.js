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
    const exchangeLabel = exchange ? `([${exchange}](${getExchangeUrl(exchange, symbol, 'USDT')}))` : ''
    return `${exchangeSymbol}${transferSymbol} sending ${getBigNumber(data.amount)} #${symbol} from #${data.from.slice(0, 10) || data.exchange} to #${data.to.slice(0, 10) || data.exchange} ${exchangeLabel}\n${getAgo(new Date(data.createdAt))}`
}
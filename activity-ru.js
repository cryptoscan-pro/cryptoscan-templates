import { getExchangeUrl } from "./utils/getExchangeUrl";
import { getBigNumber } from "./utils/getBigNumber";


function getTradeType(from) {
    const baseCoins = ['USDT', 'USDC', 'WETH', 'ETH']
    if (baseCoins.includes(from)) {
        return 'продают 🧨'
    }

    return 'покупают 🔫'
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
    const symbol = data.symbol.replace('#', '').toUpperCase();
    const symbolFrom = data.symbolFrom.replace('#', '').toUpperCase();
    return `⚖️ #${symbolFrom} ${getTradeType(symbolFrom)} на ${data.amount} #${data.symbol} ${getBigNumber(data.amount)} #${symbol}\n${getAgo(new Date(data.createdAt))}`
}
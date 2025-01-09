import { getExchangeUrl } from "./utils/getExchangeUrl";
import { getBigNumber } from "./utils/getBigNumber";

function getTradeType(from) {
    const baseCoins = ['USDT', 'USDC', 'WETH', 'ETH']
    if (from && baseCoins.includes(from)) {
        return 'selling 🧨'
    }

    return 'buying 🔫'
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
    const symbolFrom = data.symbolFrom ? ' #' + data.symbolFrom?.replace('#', '')?.toUpperCase() : '';
    const contract = data.contract ? '#' + data.contract.slice(0, 5) : '';
    return `⚖️${symbolFrom} ${getTradeType(symbolFrom.trim().replace('#', ''))} for ${data.amount} #${symbol} ${getBigNumber(data.amount)} #${symbol} ${contract}\n${getAgo(new Date(data.createdAt))}`
}
import { getExchangeUrl } from './utils/getExchangeUrl';
import { getBigNumber } from './utils/getBigNumber';

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
    const type = data.change > 0 ? 'pumping' : 'dumping';
    const symbol = data.symbol?.replace('#', '').replace('$', '').toUpperCase();
    const dexScreenerUrl = `https://dexscreener.com/search?q=${(data.contract || symbol).replaceAll(' ', '')}`;
    const coinMarketCapUrl = `https://coinmarketcap.com/community/search/latest/?q=${(data.contract || symbol).replaceAll(' ', '')}/`;
    const reference = data.reference ? `#${data.reference}` : '';
    const contract = data.contract ? (data.contract.startsWith('http') ? data.contract : `#${data.contract?.replace('-', '')?.replace(' ', '')}`) : ''
    const amount = !!data?.amount ? (getBigNumber(data.amount) + ' ') : '';
    const repeat = data.duration ? ` (repeating: ${data.duration})` : '';
    const interval = data.interval ? ` in ${data.interval}${repeat}` : ''
    return `️${label} DCA: #${symbol} ${type} for ${data.change}%${interval} #${data.symbol} ${amount}#${symbol}\n${getAgo(new Date(data.createdAt))} ${reference} ${contract}\n[DEX Screener](${dexScreenerUrl}) | [CoinMarketCap](${coinMarketCapUrl})`
}
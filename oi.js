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

export default function(inputObject) {
    // Извлекаем data из входящего объекта
    const data = inputObject;
    
    const {
        symbol,
        exchange,
        change5mUsd,
        change15mUsd,
        change1hUsd,
        priceChange5m,
        priceChange15m,
        priceChange1h,
        createdAt
    } = data;

    const formatChange = (value, unit) => {
        if (value === null) return "No data";
        const emoji = value > 0 ? "📈" : "📉";
        return `${emoji} ${value.toFixed(2)} ${unit}`;
    };

    const changes = [];
    if (change5mUsd) changes.push(`5m: ${formatChange(change5mUsd, 'USD')}`);
    if (change15mUsd) changes.push(`15m: ${formatChange(change15mUsd, 'USD')}`);
    if (change1hUsd) changes.push(`1h: ${formatChange(change1hUsd, 'USD')}`);

    const priceChanges = [];
    if (priceChange5m) priceChanges.push(`5m: ${formatChange(priceChange5m, 'USD')}`);
    if (priceChange15m) priceChanges.push(`15m: ${formatChange(priceChange15m, 'USD')}`);
    if (priceChange1h) priceChanges.push(`1h: ${formatChange(priceChange1h, 'USD')}`);

    return `📢 *OI* ${symbol} on ${exchange}\n` +
        `${changes.length ? ` changed for ${changes.join(', ')}` : ''}\n` +
        `${priceChanges.length ? `P: ${priceChanges.join(', ')}` : ''}\n` +
        `🕒 Time: ${getAgo(createdAt)} #${exchange.toLowerCase()} #${symbol.toLowerCase()}`;
}

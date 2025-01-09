import { getExchangeUrl } from "./utils/getExchangeUrl";
import { getBigNumber } from "./utils/getBigNumber";

function parsePriceChanges(obj) {
    const regex = /^priceChange(\d+)([smh])$/;
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
                    intervalText = 'сек';
                    break;
                case 'm':
                    intervalText = 'мин';
                    break;
                case 'h':
                    intervalText = 'ч';
                    break;
                default:
                    continue;
            }

            // Формируем текст для одного параметра
            results.push({ text: `${value.toFixed(1)}% за ${number} ${intervalText}`, absValue: Math.abs(value) });
        }
    }

    // Сортируем по убыванию абсолютных значений
    results.sort((a, b) => b.absValue - a.absValue);

    if ('change' in obj) {
        results.push({ text: `${obj.change}% за 5 мин`, absValue: 0 })
    }

    // Возвращаем только текст
    return results.map(result => result.text);
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
    const emoji = changes[0].startsWith('-') ? '📉' : '📈';
    const type = changes[0].startsWith('-') ? 'падает' : 'растет';
    return `${emoji} #${data?.symbol} ${type} ${changes[0]} на [${data?.exchange}](${getExchangeUrl(data?.exchange, data.symbol.toLowerCase().replace('usdt', ''), 'usdt')})\nP: ${data?.price} 24h: ${getBigNumber(data.volume)} USDT (${getAgo(new Date(data.createdAt))})\n${changes.slice(1).join(', ')}\n`
} 

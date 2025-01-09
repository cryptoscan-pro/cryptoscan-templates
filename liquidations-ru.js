import { getExchangeUrl } from "./utils/getExchangeUrl";
import { getBigNumber } from "./utils/getBigNumber";

export default function (data) {
    const type = data.variant === 'long' ? 'ЛОНГ 📉' : 'ШОРТ 📈';
    const symbol = data.symbol.replace('$', '').replace('#', '').toUpperCase();
    return `💥 Ликвидирован #${symbol} ${type} на ${getBigNumber(data.usd)} USDT на [${data.exchange}](${getExchangeUrl(data.exchange, symbol, 'USDT')}) при цене $${data.price}`
}
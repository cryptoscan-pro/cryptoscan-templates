import { getExchangeUrl } from "./utils/getExchangeUrl";
import { getBigNumber } from "./utils/getBigNumber";

export default function (data) {
    const type = data.variant === 'long' ? 'LONG 📉' : 'SHORT 📈';
    const symbol = data.symbol.replace('$', '').replace('#', '').toUpperCase();
    const protocol = data.exchange ? `#${data.exchange} ` : '';
    const chain = data.chain ? ` #${data.chain}` : '';
    const variant = data.variant ? ` #${data.variant.toUpperCase()}` : '';
    const chainLabel = data.chain ? '🔗' : '';
    return `💥${chainLabel} Liquidated #${symbol} ${type} на ${getBigNumber(data.usd)} USDT for [${data.exchange}](${getExchangeUrl(data.exchange, symbol, 'USDT')}) при цене $${data.price}\n${protocol}${chain}${variant}`
}
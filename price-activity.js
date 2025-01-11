import { getBigNumber } from "./utils/getBigNumber";
import { getExchangeUrl } from "./utils/getExchangeUrl";
import { getAgo } from "./utils/getAgo";

export default function (data) {
    const emoji = data.change >= 0 ? '📈' : '📉';
    const type = data.change >= 0 ? 'pumping' : 'dumping';
    const volume = data.volume24h ? `24h: ${getBigNumber(data.volume24h)} USDT` : '';
    const duration = data.duration ? ` in ${data.duration}` : '';
    const liquidity = data.liquidity ? ` LQ: ${getBigNumber(data.liquidity)} USDT`: '';
    const contract = data.contract ? ` #${data.contract.slice(0, 5)}` : '';
    const days = data.days ? ` #days${data.days}` : '';
    
    return `${emoji} #${data.symbol} ${type} ${data.change}% ${duration} on [${data.exchange}](${getExchangeUrl(data.exchange, data.symbol.toLowerCase().replace('usdt', ''), 'usdt')})\nP: ${data.price} ${volume} (${getAgo(new Date(data.createdAt))}) ${liquidity} ${contract} ${days}`.trim()
}

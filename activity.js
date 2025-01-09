import { getExchangeUrl } from "./utils/getExchangeUrl";
import { getBigNumber } from "./utils/getBigNumber";

function getTradeType(from) {
    const baseCoins = ['USDT', 'USDC', 'WETH', 'ETH']
    if (from && baseCoins.includes(from)) {
        return 'selling 🧨'
    }

    return 'buying 🔫'
}

import { getAgo } from "./utils/getAgo";

export default function(data) {
    const symbol = data.symbol.replace('#', '').toUpperCase();
    const symbolFrom = data.symbolFrom ? ' #' + data.symbolFrom?.replace('#', '')?.toUpperCase() : '';
    const contract = data.contract ? '#' + data.contract.slice(0, 5) : '';
    return `⚖️${symbolFrom} ${getTradeType(symbolFrom.trim().replace('#', ''))} for ${data.amount} #${symbol} ${getBigNumber(data.amount)} #${symbol} ${contract}\n${getAgo(new Date(data.createdAt))}`
}

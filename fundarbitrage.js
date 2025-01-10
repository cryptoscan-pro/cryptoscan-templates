import { getExchangeUrl  } from "./utils/getExchangeUrl";
import { getExchangeName } from "./utils/getExchangeName";
import { getBigNumber } from "./utils/getBigNumber";

export default function(data) {
    const symbol = '🧬';
    const secondSymbol = '🚨';
    
    // Support both old (price-based spread) and new format (direct spread)
    const spread = data.fundingSpread;
    
    // Base message part
    let message = `${symbol} **FUNDING** #${data.symbol}`;
    
    // Add amount and prices if they exist (old format)
    if (data.totalBuyUSD) {
        message += ` #${data.symbol} **$${getBigNumber(data.totalBuyUSD)}**`;
    }
    message += ` (+${spread.toFixed(1)}%)`;
    
    // Add exchange links
    message += ` from [${getExchangeName(data.exchangeFrom)}](${getExchangeUrl(getExchangeName(data.exchangeFrom), data.symbol?.toUpperCase().replace('USDT', ''), 'USDT')}) to [${getExchangeName(data.exchangeTo)}](${getExchangeUrl(getExchangeName(data.exchangeTo), data.symbol?.toUpperCase().replace('USDT', ''), 'USDT')})`;
    
    // Add prices if they exist (old format)
    if (data.buyPriceFrom && data.buyPriceTo) {
        message += ` $${data.buyPriceFrom} -> $${data.buyPriceTo}`;
    }
    
    // Add funding and fee if they exist (new format)
    if (data.spread !== undefined || data.feePercentage !== undefined) {
        message += `\n💰 `;
        if (data.spread !== undefined) {
            message += `Price: ${data.spread.toFixed(2)}% | `;
        }
        if (data.feePercentage !== undefined) {
            message += `Fee: ${data.feePercentage.toFixed(2)}%`;
        }
    }
    
    // Second line with tags
    message += `\n${secondSymbol}`;
    
    // Add network and contract tags if they exist (old format)
    if (data.network) {
        message += ` #${data.network}`;
    }
    message += ` #${data.exchangeFrom} #${data.exchangeTo}`;
    if (data.contract) {
        message += ` #${data.contract.slice(0, 5)}`;
    }
    
    // Add creation time if it exists (new format)
    if (data.createdAt) {
        message += `\n⏱ ${new Date(data.createdAt).toLocaleString()}`;
    }
    
    return message;
}
import { getExchangeUrl  } from "./utils/getExchangeUrl";
import { getExchangeName } from "./utils/getExchangeName";
import { getBigNumber } from "./utils/getBigNumber";

function getVariantIcon(v) {
    switch(v.toLowerCase()) {
        case "dex-cex":
            return "🔗🏦"
        case "cex-cex":
            return "🏦🏦"
        case "cex-dex":
            return "🏦🔗"
        case "futures-futures":
            return "📊📊"
        case "futures-cex":
            return "📊🏦"
        case "cex-futures":
            return "🏦📊"
        case "dex-futures":
            return "🔗📊"
        case "futures-dex":
            return "📊🔗"
        case "dex-dex":
            return "🔗🔗"
    }
}

export default function(data) {
    const symbol = getVariantIcon(data.variant);
    const secondSymbol = '🚨';
    
    // Support both old (price-based spread) and new format (direct spread)
    const spread = data.spread || (data.buyPriceTo / data.buyPriceFrom * 100 - 100);
    
    // Base message part
    let message = `${symbol} **${data.variant.toUpperCase()}**`;
    
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
    if (data.fundingSpread !== undefined || data.feePercentage !== undefined) {
        message += `\n💰 `;
        if (data.fundingSpread !== undefined) {
            message += `Funding: ${data.fundingSpread.toFixed(2)}% | `;
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
    
    // Add DexScreener and CoinMarketCap links if contract exists (old format)
    if (data.contract) {
        const dexScreenerUrl = `https://dexscreener.com/search?q=${data.contract}`;
        const coinMarketCapUrl = `https://coinmarketcap.com/community/search/latest/?q=${data.contract}/`;
        message += `\n[DexScreener](${dexScreenerUrl}) | [CM](${coinMarketCapUrl})`;
    }
    
    // Add creation time if it exists (new format)
    if (data.createdAt) {
        message += `\n⏱ ${new Date(data.createdAt).toLocaleString()}`;
    }
    
    return message;
}
}

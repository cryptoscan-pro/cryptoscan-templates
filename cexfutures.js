import { getExchangeUrl } from "./utils/getExchangeUrl";
import { getExchangeName } from "./utils/getExchangeName";
import { getAgo } from "./utils/getAgo";

function getVariantIcon(v) {
    switch(v.toLowerCase()) {
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
        default:
            return "📊📊"
    }
}

export default function(data) {
    const symbol = getVariantIcon(data.variant);
    const secondSymbol = '🚨';
    
    return `${symbol} **${data.variant.toUpperCase()}** 
Spread: ${data.spread.toFixed(2)}% | Funding: ${data.fundingSpread.toFixed(2)}% | Fee: ${data.feePercentage.toFixed(2)}%
From [${getExchangeName(data.exchangeFrom)}](${getExchangeUrl(data.exchangeFrom)}) to [${getExchangeName(data.exchangeTo)}](${getExchangeUrl(data.exchangeTo)})
${secondSymbol} #${data.exchangeFrom} #${data.exchangeTo}
${getAgo(new Date(data.createdAt))}`;
}

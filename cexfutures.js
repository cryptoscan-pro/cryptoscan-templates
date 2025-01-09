import { getExchangeName } from "./utils/getExchangeName";
import { getExchangeUrl } from "./utils/getExchangeUrl";
import { getAgo } from "./utils/getAgo";

export default function(data) {
    const profitIcon = data.spread > 0 ? "📈" : "📉";
    const fundingIcon = data.fundingSpread < 0 ? "💰" : "💸";
    
    return `${profitIcon} **FUTURES ARBITRAGE**
From [${getExchangeName(data.exchangeFrom)}](${getExchangeUrl(data.exchangeFrom)}) to [${getExchangeName(data.exchangeTo)}](${getExchangeUrl(data.exchangeTo)})
Spread: ${data.spread.toFixed(2)}% | Funding: ${data.fundingSpread.toFixed(2)}% | Fee: ${data.feePercentage.toFixed(2)}%
${getAgo(new Date(data.createdAt))}`;
}

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
    const spread = data.spread || (data.buyPriceTo / data.buyPriceFrom * 100 - 100);
    const dexScreenerUrl = `https://dexscreener.com/search?q=${data.contract}`;
    const coinMarketCapUrl = `https://coinmarketcap.com/community/search/latest/?q=${data.contract}/`;
    return `${symbol} **${data.variant.toUpperCase()}** #${data.symbol} **$${getBigNumber(data.totalBuyUSD)}** (+${spread.toFixed(1)}%) from [${getExchangeName(data.exchangeFrom)}](${getExchangeUrl(getExchangeName(data.exchangeFrom), data.symbol.toUpperCase().replace('USDT', ''), 'USDT')}) to [${getExchangeName(data.exchangeTo)}](${getExchangeUrl(getExchangeName(data.exchangeTo), data.symbol.toUpperCase().replace('USDT', ''), 'USDT')}) $${data.buyPriceFrom} -> $${data.buyPriceTo}\n${secondSymbol} #${data.network} #${data.exchangeFrom} #${data.exchangeTo} #${data.contract.slice(0, 5)}\n[DexScreener](${dexScreenerUrl}) | [CM](${coinMarketCapUrl})`
}
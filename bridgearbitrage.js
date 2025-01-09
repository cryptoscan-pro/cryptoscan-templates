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
    const symbol = '🔗🕳';
    const spread = data.spread;
    const dexScreenerUrlFrom = `https://dexscreener.com/search?q=${data.from}`;
    const dexScreenerUrlTo = `https://dexscreener.com/search?q=${data.to}`;
    return `${symbol} **${data.variant.toUpperCase()}** #${data.symbol.toLowerCase()} +${spread.toFixed(1)}% (#${data.networkFrom.toUpperCase()} -> #${data.networkTo.toUpperCase()}) from ${data.from} to ${data.to}\n[DexScreener From](${dexScreenerUrlFrom}) | [DexScreener To](${dexScreenerUrlTo}))`
}
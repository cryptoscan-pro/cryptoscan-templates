export default function(data) {
    const symbol = data.symbol.replace('$', '')
    const reference = data.reference ? `on [${data.reference}](https://dexscreener.com/search?q=${symbol})` : "";
    const r = data.reference ? `#${data.reference}` : "";
    const f = data.change ? `for ${data.change}%` : '';
    return `⚡ #${symbol} is now Trending ${reference} ${f}\n#trending ${r}`
}
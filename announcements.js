export default function(data) {
    const symbol = data.symbol ? `#${data.symbol}` : '';
    const exchange = data.exchange ? `#${data.exchange}` : '';
    return `${data.text} ${symbol} ${exchange}`
}
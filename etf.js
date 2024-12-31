function getBigNumber(value) {
    if (typeof value !== 'number') {
        return '0';
    }

    const suffixes = ['', 'K', 'M', 'B'];
    let index = 0;

    while (value >= 1000 && index < suffixes.length - 1) {
        value /= 1000;
        index++;
    }

    return `${value.toFixed(1)?.replace(/\.0$/, '')}${suffixes[index]}`;
}

export default function(data) {
    const label = data.flows > 0 ? '🌡' : '🧪';
    const symbol = data.ticker || data.symbol;

    return `${label} ETF ${data.flows > 0 ? 'INFLOW' : 'OUTFLOW'} ${getBigNumber(Math.abs(data.flows))} USDT from #${symbol} by #${data.issuer} vol: ${getBigNumber(data.volume)}\n#${data.asset} #${data.custodian} #${data.chain}`
}
import { getBigNumber } from "./utils/getBigNumber";

export default function(data) {
    const label = data.flows > 0 ? '🌡' : '🧪';
    const symbol = data.ticker || data.symbol;

    return `${label} ETF ${data.flows > 0 ? 'INFLOW' : 'OUTFLOW'} ${getBigNumber(Math.abs(data.flows))} USDT from #${symbol} by #${data.issuer} vol: ${getBigNumber(data.volume)}\n#${data.asset} #${data.custodian} #${data.chain}`
}
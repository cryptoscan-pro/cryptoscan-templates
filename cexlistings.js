import { getExchangeUrl } from "./utils/getExchangeUrl";

export default function(data) {
    let actionLabel = 'Listed on';
    let actionEmoji = '🚀';

    if (data.isWillBeAdded && data.isApiListing) { 
        actionLabel = 'Will be added to api in'
        actionEmoji = '🧑‍💻🕔'
    }
    if (!data.isWillBeAdded && data.isApiListing) { 
        actionLabel = 'Added to api in'
        actionEmoji = '🧑‍💻🕔'
    }
    if (data.isWillBeAdded && !data.isApiListing) { 
        actionLabel = 'Will be listed on'
        actionEmoji = '🚀🕔'
    }
    if (data.isWillBeAdded && data.isFuturesListing) { 
        actionLabel = 'Will be listed on Futures '
        actionEmoji = '🏦🕔'
    }
    if (!data.isWillBeAdded && data.isFuturesListing) { 
        actionLabel = 'Listed on Futures '
        actionEmoji = '🏦'
    }

    return `${actionEmoji} #${data.symbol.replace('$', '')} ${actionLabel} [${data.exchange.toUpperCase()}](${getExchangeUrl(data.exchange, data.symbol.toUpperCase().replace('USDT', ''), 'USDT')})`
}
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

    return ` #${data.symbol.replace('$', '')} ${actionLabel} #${data.exchange.toUpperCase()}\n[Pair Link](${data.pairLink.replace('$', '')})`
}
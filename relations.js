async function fetchItem(id) {
    return fetch(`https://api.cryptoscan.pro?id=${id}`).then((r) => r.json()).then((r) => r.data[0])
}

export default async function(data) {
    const itemFrom = await fetchItem(data.from);
    const itemTo = await fetchItem(data.to);
    let text = '';

    text += 'BEFORE\n'
    text += Object.entries(itemFrom).map(([key, value]) => `${key}=${value}`).join('\n')
    text += '\n\nAFTER\n'
    text += Object.entries(itemTo).map(([key, value]) => `${key}=${value}`).join('\n')
    text += `\n\nRELATION: ${data.field}`;
    return text;
}
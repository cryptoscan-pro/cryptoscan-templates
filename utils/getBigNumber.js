export function getBigNumber(value) {
    if (typeof value !== 'number') {
        return '0';
    }

    const suffixes = ['', 'K', 'M', 'B'];
    let index = 0;

    while (value >= 1000 && index < suffixes.length - 1) {
        value /= 1000;
        index++;
    }

    return `${value.toFixed(1).replace(/\.0$/, '')}${suffixes[index]}`;
}
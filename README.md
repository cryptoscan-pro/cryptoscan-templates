# Cryptoscan Templates

## Project Overview
This project contains template files for formatting cryptocurrency market data alerts for a Telegram bot. The templates handle different types of market events:

- Price movements (`prices.js`)
- Trading volume changes (`trades.js`) 
- Token transfers (`transfers.js`)

## Template Structure
Each template file follows a similar pattern:

1. Utility Functions:
- `getBigNumber()` - Formats large numbers with K/M/B suffixes
- `parsePriceChanges()`/`parseVolumeChanges()` - Parses time-interval changes
- `getExchangeUrl()` - Generates exchange-specific trading URLs
- `getAgo()` - Formats timestamps into relative time

2. Default Export Function:
- Takes event data as input
- Formats data into human-readable Telegram messages
- Returns formatted string with markdown formatting

## How to Add New Features

### Adding New Exchange Support
1. Add new case in `getExchangeUrl()` function:
```javascript
case "new-exchange": {
    return `https://new-exchange.com/trade/${to}/${from}`;
}
```

### Adding New Time Intervals
1. Modify regex pattern in parse functions:
```javascript
const regex = /^(price|volume)Change(\d+)([smhd])$/;  // Add 'd' for days
```

### Adding New Alert Types
1. Create new template file (e.g. `newAlert.js`)
2. Copy base utility functions
3. Implement custom parsing logic
4. Add formatting function as default export

### Improving Message Formatting
- Modify emoji usage in template strings
- Adjust number formatting in `getBigNumber()`
- Update time formatting in `getAgo()`

## Best Practices
- Keep template logic modular and reusable
- Maintain consistent formatting across templates
- Add comments for complex parsing logic
- Test with various data scenarios
- Keep URLs up-to-date with exchange changes

## Contributing
1. Fork repository
2. Create feature branch
3. Add/modify templates
4. Test thoroughly
5. Submit pull request

## Community
Join our Telegram channels for updates and support:
- [Cryptoscan Telegram Alerts](https://t.me/+6CEHeFNbmGJlYTgy)
- [Cryptoscan RU Telegram Alerts](https://t.me/+Cb6YRE0aO9s1ZDNi)

## Links
- [Telegram Bot Repository](https://github.com/cryptoscan-pro/crypto-bot-tg)

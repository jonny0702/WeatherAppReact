const fs = require('fs');

fs.writeFileSync('./.env',
`API_WEATHER=${process.env.API_WEATHER}\n
API_FORECAST=${process.env.API_FORECAST}\n
API_KEY=${process.env.API_KEY}
`)
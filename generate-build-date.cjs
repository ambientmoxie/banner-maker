const fs = require("fs");
const path = require("path");

const buildDate = new Date().toISOString();
const envFilePath = path.join(__dirname, ".env");

fs.writeFileSync(envFilePath, `VITE_BUILD_DATE="${buildDate}"\n`);

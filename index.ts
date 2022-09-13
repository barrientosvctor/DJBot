console.clear();
import "dotenv/config";
import bot from "./src/DJBot";
new bot().start();

process.on("uncaughtException", err => console.error(err));
process.on("unhandledRejection", err => console.error(err));
process.on("uncaughtExceptionMonitor", err => console.error(err));

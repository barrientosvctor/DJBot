import fs from "fs";
import bot from "../DJBot";
import { Event } from "../structures/Event";
let count: number = 0;

export function EventHandler(bot: bot) {
    fs.readdirSync("./src/events").forEach(subfolder => {
        fs.readdirSync(`./src/events/${subfolder}`).filter(f => f.endsWith(".ts")).forEach(async file => {
            ++count;
            const event: Event = (await import(`../events/${subfolder}/${file}`)).default;

            if (event.once) bot.once(event.name, event.run.bind(null, bot));
            else bot.on(event.name, event.run.bind(null, bot));
        });
    });

    console.log(`¡${count} eventos cargados!`);
}

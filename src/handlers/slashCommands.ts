import fs from "fs";
import bot from "../DJBot";
import { Interaction } from "../structures/Interaction";

export function SlashCommandHandler(bot: bot) {
    console.log("Refrescando comandos de barra...");

    fs.readdirSync("./src/commands/Slash").filter(f => f.endsWith(".ts")).forEach(async file => {
        const { default: slash }: { default: Interaction } = await import(`../commands/Slash/${file}`);
        bot.slash.set(slash.name, slash);
    });

    // bot.once("ready", () => void bot.guilds.cache.get()?.commands?.set(bot.slash.map(slashCommand => slashCommand.toJSON())).catch(err => console.error(err)));
    bot.once("ready", () => void bot.application.commands?.set(bot.slash.map(slashCommand => slashCommand.toJSON())).catch(err => console.error(err)));

    console.log("¡Comandos de barra refrescados correctamente!");
}

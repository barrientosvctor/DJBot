import fs from "fs";
import bot from "../DJBot";
import { Command } from "../structures/Command";
let count: number = 0;

export function CommandHandler(bot: bot) {
    fs.readdirSync("./src/commands/Prefix").forEach(categorie => {
	fs.readdirSync(`./src/commands/Prefix/${categorie}`).filter(f => f.endsWith(".ts")).forEach(async file => {
	    ++count;
	    const command: Command = (await import(`../commands/Prefix/${categorie}/${file}`)).default;
	    bot.commands.set(command.name, command);
	    if (command.aliases && Array.isArray(command.aliases)) command.aliases.forEach(alias => bot.aliases.set(alias, command.name));
	});
    });

    console.log(`¡${count} comandos de prefix cargados!`);
}

import { EmbedBuilder } from "discord.js";
import { Command } from "../../../structures/Command";

export default new Command({
    name: "ping",
    description: "Muestra la latencia del bot.",
    cooldown: 3,
    aliases: ["pi"],
    enabled: true,
    run(bot, msg) {
        try {
            return msg.reply(`Pong! ${bot.ws.ping}ms`);
        } catch (error) {
            console.error(error);
            bot.hook.send({ embeds: [new EmbedBuilder().setColor('NotQuiteBlack').setTitle(`Error en ${this.name}`).setDescription(`${error}`)] });
        }
    }
});

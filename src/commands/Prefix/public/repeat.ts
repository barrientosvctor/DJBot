import { EmbedBuilder } from "discord.js";
import { Command } from "../../../structures/Command";

export default new Command({
    name: "repeat",
    description: "Repite la canción que está sonando.",
    cooldown: 3,
    aliases: ["rp", "replay"],
    enabled: true,
    channelOnly: true,
    sameChannel: true,
    checkQueue: true,
    djOnly: true,
    run(bot, msg) {
        try {
            bot.distube.getQueue(msg.guildId!)?.seek(0);
            return msg.reply(`${bot.getEmoji("check")} Bien, la canción **${bot.distube.getQueue(msg.guildId!)?.songs[0].name}** se ha repetido.`);
        } catch (error) {
            console.error(error);
            bot.hook.send({ embeds: [new EmbedBuilder().setColor('NotQuiteBlack').setTitle(`Error en ${this.name}`).setDescription(`${error}`)] });
        }
    }
});

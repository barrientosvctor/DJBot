import { EmbedBuilder } from "discord.js";
import { Command } from "../../../structures/Command";

export default new Command({
    name: "leave",
    description: "Saca al bot del canal de voz.",
    cooldown: 3,
    aliases: ["lv"],
    enabled: true,
    channelOnly: true,
    sameChannel: true,
    run(bot, msg) {
        try {
            if (!msg.guild?.members.me?.voice.channel) return msg.channel.send(`${bot.getEmoji("error")} No estoy unido a ningún canal de voz.`);
            bot.distube.voices.get(msg)?.leave();
        } catch (error) {
            console.error(error);
            bot.hook.send({ embeds: [new EmbedBuilder().setColor('NotQuiteBlack').setTitle(`Error en ${this.name}`).setDescription(`${error}`)] });
        }
    }
});

import { EmbedBuilder, GuildTextBasedChannel } from "discord.js";
import { Command } from "../../../structures/Command";

export default new Command({
    name: "play",
    description: "Reproduce música de YouTube, Spotify y SoundCloud.",
    usage: "<nombre / url>",
    cooldown: 3,
    aliases: ["p"],
    enabled: true,
    channelOnly: true,
    sameChannel: true,
    djOnly: true,
    botPerms: ["Connect", "Speak", "UseVAD"],
    run(bot, msg, args) {
        try {
            if (!args![1]) return msg.channel.send(`${bot.getEmoji("noargs")} Escribe el nombre o la URL de la canción que quieras escuchar.`);
            bot.distube.play(msg.member?.voice.channel!, args!.slice(1).join(" "), { textChannel: msg.channel as GuildTextBasedChannel, member: msg.member! });
            return msg.reply(`${bot.getEmoji("search")} Buscando \`${args!.slice(1).join(" ")}\``);
        } catch (error) {
            console.error(error);
            bot.hook.send({ embeds: [new EmbedBuilder().setColor('NotQuiteBlack').setTitle(`Error en ${this.name}`).setDescription(`${error}`)] });
        }
    }
});

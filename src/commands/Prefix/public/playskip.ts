import { EmbedBuilder, GuildTextBasedChannel } from "discord.js";
import { Command } from "../../../structures/Command";

export default new Command({
    name: "playskip",
    description: "Añade una canción a la lista y salta la que está sonando.",
    usage: "<nombre / url>",
    cooldown: 3,
    aliases: ["pskip"],
    enabled: true,
    channelOnly: true,
    sameChannel: true,
    checkQueue: true,
    djOnly: true,
    run(bot, msg, args) {
        try {
            if (!args![1]) return msg.reply(`${bot.getEmoji("noargs")} Escribe el nombre o la URL de la canción que quieres escuchar para proceder a saltar la canción **${bot.distube.getQueue(msg.guildId!)?.songs[0].name}**.`);
            bot.distube.play(msg.member?.voice.channel!, args!.slice(1).join(" "), { textChannel: msg.channel as GuildTextBasedChannel, member: msg.member!, skip: true });
            msg.reply(`${bot.getEmoji("search")} Buscando \`${args!.slice(1).join(" ")}\``);
        } catch (error) {
            console.error(error);
            bot.hook.send({ embeds: [new EmbedBuilder().setColor('NotQuiteBlack').setTitle(`Error en ${this.name}`).setDescription(`${error}`)] });
        }
    }
});

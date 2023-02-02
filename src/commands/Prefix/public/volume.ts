import { EmbedBuilder } from "discord.js";
import { Command } from "../../../structures/Command";

export default new Command({
    name: "volume",
    description: "Cambia el volumen de la música.",
    usage: "<número>",
    cooldown: 3,
    aliases: ["vl", "volumen"],
    enabled: true,
    channelOnly: true,
    sameChannel: true,
    checkQueue: true,
    djOnly: true,
    run(bot, msg, args) {
        try {
            if (!args![1]) return msg.reply(`${bot.getEmoji("noargs")} Escribe el porcentaje de volumen para cambiarlo.`);

            if (isNaN(parseInt(args![1]))) return msg.reply(`El argumento **${args![1]}** debe ser un número.`);

            if (parseInt(args![1]) < 0 || parseInt(args![1]) > 100) return msg.reply(`${bot.getEmoji("error")} El volumen no puede ser menor a **0** o mayor a **100**.`);

            bot.distube.setVolume(msg, parseInt(args![1]));
            return msg.reply(`${bot.getEmoji("check")} El volumen ha cambiado a **${args![1]}%**`);
        } catch (error) {
            console.error(error);
            bot.hook.send({ embeds: [new EmbedBuilder().setColor('NotQuiteBlack').setTitle(`Error en ${this.name}`).setDescription(`${error}`)] });
        }
    }
});

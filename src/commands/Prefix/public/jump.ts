import { EmbedBuilder } from "discord.js";
import { Queue } from "distube";
import { Command } from "../../../structures/Command";

export default new Command({
    name: "jump",
    description: "Adelanto la lista al número de lista que me indiques.",
    usage: "<número de lista>",
    cooldown: 3,
    aliases: ["jmp", "skipto"],
    enabled: true,
    channelOnly: true,
    sameChannel: true,
    checkQueue: true,
    djOnly: true,
    async run(bot, msg, args) {
	try {
	    if (!args![1]) return msg.reply(`${bot.getEmoji("noargs")} Escribe el número de lista para adelantar la lista.`);
            if (isNaN(parseInt(args![1]))) return msg.reply(`${bot.getEmoji("error")} El argumento **${args![1]}** debe ser un número.`);
        
            const queue: Queue | undefined = bot.distube.getQueue(msg.guildId!);
        
            if (parseInt(args![1]) === 1) return;
            if (parseInt(args![1]) > queue!.songs.length) return msg.reply(`${bot.getEmoji("error")} No puedo mover la canción a un número de lista que no existe.`);

            await bot.distube.jump(msg, parseInt(args![1])).then(() => {
                return msg.reply(`${bot.getEmoji("check")} La lista de canciones ha sido adelantada al número ${parseInt(args![1])}.`);
            }).catch(err => { console.error(err); msg.channel.send(`${bot.getEmoji("warning")} Ocurrió un error al intentar mover la canción en la lista`); });
	} catch (error) {
	    console.error(error);
	    bot.hook.send({ embeds: [new EmbedBuilder().setColor('NotQuiteBlack').setTitle(`Error en ${this.name}`).setDescription(`${error}`)] });
	}
    }
});

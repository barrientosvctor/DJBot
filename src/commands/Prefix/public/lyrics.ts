import { Command } from "../../../structures/Command";
import axios from "axios";
import { DJBotEmbed } from "../../../structures/DJBotEmbed";
import { EmbedBuilder } from "discord.js";

export default new Command({
    name: "lyrics",
    description: "Muestra la letra de la canción que busques.",
    usage: "<nombre canción>",
    cooldown: 3,
    aliases: ["ly"],
    enabled: true,
    async run(bot, msg, args) {
	try {
	    if (!args![1]) return msg.channel.send(`${bot.getEmoji("noargs")} Escribe el nombre de la canción que quieres saber su letra.`);

	    const data = await axios.get(`https://api.popcat.xyz/lyrics?song=${args!.slice(1).join(" ").replace(" ", "+")}`, { method: "get" }).then(res => res.data);
	    
	    if (data.error) return msg.reply(`${bot.getEmoji("error")} No se encontraron resultados con esta canción.`);

	    const embed: DJBotEmbed = new DJBotEmbed(msg.author, msg.guild!, {})
	    .setThumbnail(data.image || null)
            .setTitle(`${data.title} - ${data.artist}` || "Desconocido")
            .setDescription(data.lyrics || "Letra no disponible.");

	    return msg.reply({ embeds: [embed] });
	} catch (error) {
	    console.error(error);
	    bot.hook.send({ embeds: [new EmbedBuilder().setColor('NotQuiteBlack').setTitle(`Error en ${this.name}`).setDescription(`${error}`)] });
	}
    }
});

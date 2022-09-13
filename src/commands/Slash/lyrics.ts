import { Interaction } from "../../structures/Interaction";
import axios from "axios";
import { DJBotEmbed } from "../../structures/DJBotEmbed";

export default new Interaction()
.setName("lyrics")
.setDescription("Busca la letra de la canción que quieras.")
.addStringOption(opt => opt.setName("canción").setDescription("Escribe aquí el nombre de la canción, es recomendable añadir el nombre del artista.").setRequired(true))
.setEnabledCommand(true)
.setCallback(async ({ bot, int }) => {
    try {
	const data = await axios.get(`https://api.popcat.xyz/lyrics?song=${int.options.getString("canción")?.replace(" ", "+")}`, { method: "get" }).then(res => res.data);
	    
	if (data.error) return int.editReply(`${bot.getEmoji("error")} No se encontraron resultados con esta canción.`);

	const embed: DJBotEmbed = new DJBotEmbed(int.user, int.guild, {})
	.setThumbnail(data.image || null)
        .setTitle(`${data.title} - ${data.artist}` || "Desconocido")
        .setDescription(data.lyrics || "Letra no disponible.");

	return int.editReply({ embeds: [embed] });
    } catch (error) {
        console.error(error);
    }
});

import { EmbedBuilder } from "discord.js";
import { Event } from "../../structures/Event";

export default new Event({
    name: "",
    once: false,
    async run(bot) {
	try {
	    //
	} catch (error) {
	    console.error(error);
	    bot.hook.send({ embeds: [new EmbedBuilder().setColor('NotQuiteBlack').setTitle(`Error en el evento ${this.name}`).setDescription(`${error}`)] });
	}
    }
});

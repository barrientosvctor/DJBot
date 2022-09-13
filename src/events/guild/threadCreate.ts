import { EmbedBuilder, ThreadChannel } from "discord.js";
import { Event } from "../../structures/Event";

export default new Event({
    name: "threadCreate",
    async run(bot, thread: ThreadChannel) {
	try {
	    if (thread.joinable) await thread.join();
	} catch (error) {
	    console.error(error);
	    bot.hook.send({ embeds: [new EmbedBuilder().setColor('NotQuiteBlack').setTitle(`Error en el evento ${this.name}`).setDescription(`${error}`)] });
	}
    }
});

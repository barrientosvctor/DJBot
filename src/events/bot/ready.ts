import { ActivityType, EmbedBuilder } from "discord.js";
import { Event } from "../../structures/Event";

export default new Event({
    name: "ready",
    once: true,
    async run(bot) {
	try {
	    await bot.application.fetch().catch(err => console.error(err));
	    console.log(`¡El bot ${bot.user.tag} se conectó a Discord correctamente!`);
	    bot.user.setPresence({ activities: [{ name: "Música", type: ActivityType.Listening }], status: "online" });
	} catch (error) {
	    console.error(error);
	    bot.hook.send({ embeds: [new EmbedBuilder().setColor('NotQuiteBlack').setTitle(`Error en el evento ${this.name}`).setDescription(`${error}`)] });
	}
    }
});

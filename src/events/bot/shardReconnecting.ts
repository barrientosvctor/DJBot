import { EmbedBuilder } from "discord.js";
import { Event } from "../../structures/Event";

export default new Event({
    name: "shardReconnecting",
    async run(bot, id: number) {
        try {
            console.log(`Shard: ${id} está intentando reconectarse...`);
        } catch (error) {
            console.error(error);
            bot.hook.send({ embeds: [new EmbedBuilder().setColor('NotQuiteBlack').setTitle(`Error en el evento ${this.name}`).setDescription(`${error}`)] });
        }
    }
});

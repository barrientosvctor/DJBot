import { EmbedBuilder } from "discord.js";
import { Event } from "../../structures/Event";

export default new Event({
    name: "shardError",
    async run(bot, error: Error, shardId: number) {
        try {
            console.error(error);
            console.log(`Shard: ${shardId} encontró un error: ${error}`);
        } catch (error) {
            console.error(error);
            bot.hook.send({ embeds: [new EmbedBuilder().setColor('NotQuiteBlack').setTitle(`Error en el evento ${this.name}`).setDescription(`${error}`)] });
        }
    }
});

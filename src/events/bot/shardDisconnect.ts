import { CloseEvent, EmbedBuilder } from "discord.js";
import { Event } from "../../structures/Event";

export default new Event({
    name: "shardDisconnect",
    async run(bot, event: CloseEvent, id: number) {
        try {
            console.log(event.reason);
            console.log(`Shard: ${id} desconectado por la razón: ${event.reason}`);
        } catch (error) {
            console.error(error);
            bot.hook.send({ embeds: [new EmbedBuilder().setColor('NotQuiteBlack').setTitle(`Error en el evento ${this.name}`).setDescription(`${error}`)] });
        }
    }
});

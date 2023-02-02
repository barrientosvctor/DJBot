import { Interaction } from "../../structures/Interaction";

export default new Interaction()
.setName("ping")
.setDescription("Muestra la latencia del bot.")
.setEnabledCommand(true)
.setCallback(async ({ bot, int }) => {
    try {
        return int.editReply(`${bot.getEmoji("check")} Pong! ${bot.ws.ping}ms`);
    } catch (error) {
        console.error(error);
    }
});

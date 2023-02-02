import { Interaction } from "../../structures/Interaction";

export default new Interaction()
.setName("leave")
.setDescription("Saca al bot del canal de voz.")
.setEnabledCommand(true)
.setChannelOnly(true)
.setSameChannel(true)
.setDJOnly(true)
.setCallback(async ({ bot, int }) => {
    try {
        if (!int.guild.members.me?.voice.channel) return int.editReply(`${bot.getEmoji("error")} No estoy unido a ningún canal de voz.`);
        bot.distube.voices.get(int)?.leave();
        return int.editReply(`Me he salido del canal de voz.`);
    } catch (error) {
        console.error(error);
    }
});

import { VoiceBasedChannel } from "discord.js";
import { Interaction } from "../../structures/Interaction";

export default new Interaction()
.setName("join")
.setDescription("Añade al bot al canal de voz que estés.")
.setBotPermissions(["Connect", "Speak", "UseVAD"])
.setEnabledCommand(true)
.setChannelOnly(true)
.setSameChannel(true)
.setDJOnly(true)
.setCallback(async ({ bot, int }) => {
    try {
        const botVoice: VoiceBasedChannel | null | undefined = int.guild.members.me?.voice.channel;
        const memberVoice: VoiceBasedChannel | null | undefined  = int.member.voice.channel;

        if (botVoice) {
            if (botVoice === memberVoice) return int.editReply(`Ya estaba unido al canal de voz.`);
        } else if (memberVoice) {
            bot.distube.voices.join(memberVoice).then(() => {
                return int.editReply(`${bot.getEmoji("check")} Me he unido al canal de voz *#${memberVoice.name}*`)
            }).catch(err => {
                int.editReply(`Ocurrió un error al intentar entrar al canal de voz.`);
                console.error(err);
            });
        }
    } catch (error) {
        console.error(error);
    }
});

import { EmbedBuilder, VoiceBasedChannel } from "discord.js";
import { Command } from "../../../structures/Command";

export default new Command({
    name: "join",
    description: "Une a DJ Bot al canal de voz que estés.",
    cooldown: 3,
    aliases: ["jn"],
    enabled: true,
    channelOnly: true,
    sameChannel: true,
    botPerms: ["Connect", "Speak", "UseVAD"],
    run(bot, msg) {
        try {
            const botVoice: VoiceBasedChannel | null | undefined = msg.guild!.members.me?.voice.channel;
            const memberVoice: VoiceBasedChannel | null | undefined = msg.member?.voice?.channel;

            if (botVoice) {
                if (botVoice === memberVoice) return msg.reply(`Ya estaba unido al canal de voz *#${botVoice.name}* anteriormente`);
            } else if (memberVoice) {
                bot.distube.voices.join(memberVoice).then(() => {
                    return msg.reply(`¡Me he unido al canal de voz *#${memberVoice.name}*!`);
                }).catch(err => { console.error(err); msg.channel.send(`No pude unirme a tu canal de voz debido a un error`); });
            }
        } catch (error) {
            console.error(error);
            bot.hook.send({ embeds: [new EmbedBuilder().setColor('NotQuiteBlack').setTitle(`Error en ${this.name}`).setDescription(`${error}`)] });
        }
    }
});

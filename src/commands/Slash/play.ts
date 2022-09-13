import { Interaction } from "../../structures/Interaction";

export default new Interaction()
.setName("play")
.setDescription("Reproduce cualquier música de YouTube, Spotify y SoundCloud.")
.addStringOption(opt => opt.setName("canción").setDescription("En este campo escribe el nombre o la URL de la canción que quieras escuchar.").setRequired(true))
.setBotPermissions(["Connect", "Speak", "UseVAD"])
.setEnabledCommand(true)
.setChannelOnly(true)
.setSameChannel(true)
.setDJOnly(true)
.setCallback(async ({ bot, int }) => {
    try {
	bot.distube.play(int.member.voice.channel!, int.options.getString("canción")!, { textChannel: int.channel || undefined, member: int.member });
	return int.editReply(`${bot.getEmoji("search")} Buscando \`${int.options.getString("canción")}\``);
    } catch (error) {
        console.error(error);
    }
});

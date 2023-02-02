import { Interaction } from "../../structures/Interaction";

export default new Interaction()
.setName("playskip")
.setDescription("Añade una canción a la lista y salta la que está sonando.")
.addStringOption(opt => opt.setName("canción").setDescription("En este campo escribe el nombre o la URL de la canción que quieras escuchar.").setRequired(true))
.setEnabledCommand(true)
.setChannelOnly(true)
.setSameChannel(true)
.setCheckQueue(true)
.setDJOnly(true)
.setCallback(async ({ bot, int }) => {
    try {
        bot.distube.play(int.member.voice.channel!, int.options.getString("canción")!, { textChannel: int.channel || undefined, member: int.member, skip: true });
        return int.editReply(`${bot.getEmoji("search")} Buscando \`${int.options.getString("canción")}\``);
    } catch (error) {
        console.error(error);
    }
});

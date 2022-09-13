import { EmbedBuilder } from "discord.js";
import { Command } from "../../../structures/Command";
import { Database } from "../../../structures/Database";

export default new Command({
    name: "prefix",
    description: "Cambia el prefix del bot en el servidor.",
    usage: "<prefix>",
    cooldown: 3,
    aliases: ["pf"],
    enabled: true,
    memberPerms: ["ManageGuild"],
    run(bot, msg, args, prefix) {
	try {
	    if (!args![1]) return msg.reply(`${bot.getEmoji("noargs")} Escribe el nuevo prefix que tendré en el servidor.`);
            if (args![1].length > 4) return msg.reply(`${bot.getEmoji("check")} El prefix no puede sobrepasar de 4 carácteres.`);

            const database: Database = new Database("./src/databases/prefix.json");

            if (args![1] === ".") {
                if (database.has(msg.guildId!)) {
                    database.delete(msg.guildId!);
                    return msg.reply(`${bot.getEmoji("check")} Mi prefix se ha reiniciado a **.**`);
                } else return msg.reply(`${bot.getEmoji("warning")} Mi prefix predeterminado ya era **.**`);
            } else if (args![1] === prefix) return msg.reply(`${bot.getEmoji("check")} Ya tenia establecido ese prefix.`);
            else {
                database.set(msg.guildId!, args![1]);
                return msg.reply(`${bot.getEmoji("check")} Bien, mi prefix ha sido establecido a **${args![1]}**`);
            }
	} catch (error) {
	    console.error(error);
	    bot.hook.send({ embeds: [new EmbedBuilder().setColor('NotQuiteBlack').setTitle(`Error en ${this.name}`).setDescription(`${error}`)] });
	}
    }
});

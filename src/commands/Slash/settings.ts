import { Role } from "discord.js";
import { Database } from "../../structures/Database";
import { DJBotEmbed } from "../../structures/DJBotEmbed";
import { Interaction } from "../../structures/Interaction";

export default new Interaction()
.setName("settings")
.setDescription("Añade configuraciones extras al bot.")
.addSubcommandGroup(group => 
    group
    .setName("dj")
    .setDescription("Administra el rol de DJ en el servidor.")
    .addSubcommand(cmd => 
	cmd
	.setName("set")
	.setDescription("Establece un rol de DJ en el servidor")
	.addRoleOption(opt => opt.setName("rol").setDescription("Busca el rol que quieres añadir.").setRequired(true)))
    .addSubcommand(cmd => 
	cmd
	.setName("delete")
	.setDescription("Elimina el rol de DJ que esté establecido en el servidor."))
    .addSubcommand(cmd => 
	cmd
	.setName("show")
	.setDescription("Muestra el rol DJ establecido en el servidor."))
)
.setEnabledCommand(true)
.setMemberPermissions(["ManageGuild"])
.setCallback(async ({ bot, int }) => {
    try {
	const database: Database = new Database("./src/databases/djrole.json");

	if (int.options.getSubcommandGroup() === "dj") {
	    if (int.options.getSubcommand() === "set") {
		const role: Role | null = int.options.getRole("rol");
		if (role?.managed) return int.editReply(`${bot.getEmoji("error")} No puedo establecer un rol gestionado por alguna integración. Prueba con otro.`);

		if (database.has(int.guildId) && role?.id === await database.get(int.guildId)) return int.editReply(`${bot.getEmoji("error")} El rol <@&${role?.id}> ya ha sido establecido como rol de DJ anteriormente, prueba con otro.`);
		else {
		    database.set(int.guildId, role?.id);
		    return int.editReply(`${bot.getEmoji("check")} Bien! El rol <@&${role?.id}> ha sido establecido como rol de DJ en ${int.guild.name}. A partir de ahora solo quienes tengan este role podrán usar los comandos de música.`);
		}
	    } else if (int.options.getSubcommand() === "delete") {
		if (database.has(int.guildId)) {
		    const roleInDB = await database.get(int.guildId);
		    database.delete(int.guildId);
		    return int.editReply(`${bot.getEmoji("check")} El rol <@&${roleInDB}> ha sido eliminado cómo rol de DJ en ${int.guild.name}.`);
		} else return int.editReply(`${bot.getEmoji("error")} No puedo eliminar ningún rol de DJ debido a que no se ha establecido uno. Para establecer uno haz uso del comando /settings dj set`);
	    } else {
		if (database.has(int.guildId)) return int.editReply({ embeds: [new DJBotEmbed(int.user, int.guild, {}).setTitle(`Rol DJ de ${int.guild.name}`).setDescription(`<@&${await database.get(int.guildId)}>`)] });
		else return int.editReply(`${bot.getEmoji("error")} No se han encontrado roles de DJ en ${int.guild.name}`);
	    }
	}
    } catch (error) {
        console.error(error);
    }
});

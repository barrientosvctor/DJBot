import { Role, EmbedBuilder } from "discord.js";
import { Command } from "../../../structures/Command";
import { Database } from "../../../structures/Database";
import { DJBotEmbed } from "../../../structures/DJBotEmbed";

export default new Command({
    name: "dj",
    description: "Agrega un rol especial de DJ que permite que solo los que tengan este rol puedan manejar la lista de canciones.",
    usage: "<set / delete / show> <@rol | ID>",
    cooldown: 3,
    aliases: ["djrole"],
    enabled: true,
    memberPerms: ["ManageGuild"],
    async run(bot, msg, args, prefix) {
	try {
	    if (!args![1]) return msg.channel.send(`${bot.getEmoji("noargs")} Escribe **set**, **delete** o **show**.`);

	    function getRole(role: string): Role | undefined {
		if (!role) return;
		else {
		    if (role.startsWith(`\\`)) {
			role = role.slice(1);
		    }
		    if (role.startsWith(`<@&`) && role.endsWith(`>`)) {
			role = role.slice(3, -1);

			if (role.startsWith(`!`)) {
			    role = role.slice(1);
			}
		    }
		    if (!Number(role) && role.length !== 18) return;
		}
		return msg.guild?.roles.cache.get(role);
	    }

	    const database: Database = new Database("./src/databases/djrole.json")

	    if (args![1] === "set") {
		if (!args![2]) return msg.channel.send(`${bot.getEmoji("noargs")} Menciona o escribe la ID del rol que quieres agregar cómo rol DJ.`);
		const role: Role | undefined = getRole(args![2]);
		if (!role) return msg.reply(`${bot.getEmoji("error")} Ese rol no existe en el servidor, prueba a usar otro.`);
		
		if (database.has(msg.guildId!) && role?.id === await database.get(msg.guildId!)) return msg.reply(`${bot.getEmoji("error")} El rol <@&${role?.id}> ya ha sido establecido como rol de DJ anteriormente, prueba con otro.`);
		else {
		    database.set(msg.guildId!, role?.id);
		    return msg.reply(`${bot.getEmoji("check")} El rol <@&${await database.get(msg.guildId!)}> ha sido añadido como rol de DJ en ${msg.guild?.name}. A partir de ahora solo quienes tengan este rol podrán usar comandos de música.`);
		}
	    } else if (args![1] === "delete") {
		if (database.has(msg.guildId!)) {
		    const RoleInDB = await database.get(msg.guildId!);
		    database.delete(msg.guildId!);
		    return msg.reply(`${bot.getEmoji("check")} El rol <@&${RoleInDB}> ha sido eliminado como rol DJ.`);
		} else return msg.reply(`${bot.getEmoji("error")} No se ha añadido ningún rol en ${msg.guild?.name}. Para hacerlo haz uso del comando ${prefix}djrole set @rol`);
	    } else if (args![1] === "show") {
		if (database.has(msg.guildId!)) return msg.reply({ embeds: [new DJBotEmbed(msg.author, msg.guild!, {}).setTitle(`Rol DJ de ${msg.guild?.name}`).setDescription(`<@&${await database.get(msg.guildId!)}>`)] });
		else return msg.reply(`${bot.getEmoji("error")} No se han encontrado roles de DJ en ${msg.guild?.name}`);
	    } else return msg.channel.send(`${bot.getEmoji("error")} Opción no válida.`);
	} catch (error) {
	    console.error(error);
	    bot.hook.send({ embeds: [new EmbedBuilder().setColor('NotQuiteBlack').setTitle(`Error en ${this.name}`).setDescription(`${error}`)] });
	}
    }
});

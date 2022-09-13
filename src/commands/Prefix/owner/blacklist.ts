import { EmbedBuilder, User } from "discord.js";
import { Command } from "../../../structures/Command";
import { Database } from "../../../structures/Database";
import { DJBotEmbed } from "../../../structures/DJBotEmbed";

export default new Command({
    name: "blacklist",
    description: "Añade un usuario a la lista.",
    usage: "<add / remove / find> <@usuario | ID> [razón]",
    cooldown: 3,
    aliases: ["bl"],
    enabled: true,
    ownerOnly: true,
    async run(bot, msg, args) {
	try {
        async function getUser(user: string) {
            if (!user) {
                return;
            } else {
                if (user.startsWith(`\\`)) {
                    user = user.slice(1);
                };
                if (user.startsWith(`<@`) && user.endsWith(`>`)) {
                    user = user.slice(2, -1);

                    if (user.startsWith(`!`)) {
                        user = user.slice(1);
                    };
                };
                if (!Number(user) && user.length !== 18) {
                    return;
                };
            };

            return bot.users.fetch(user);
        };

        if(!args![1]) return msg.reply(`${bot.getEmoji("noargs")} Escribe **add**, **remove** o **find**`);
        if(!['add', 'remove', 'find'].includes(args![1])) return msg.reply(`Opción no válida.`);
        if(!args![2]) return msg.reply(`${bot.getEmoji("noargs")} Menciona o escribe la ID de un usuario.`);

        const user: User | undefined = await getUser(args![2]);
        if(!user) return msg.reply(`Este usuario no existe.`);

        const database: Database = new Database("./src/databases/blacklist.json");

        if(args![1] === 'add') {
            let motivo: string = args!.slice(3).join(" ");
            if(!motivo) motivo = "No se dio motivo.";

            if(database.has(user.id)) return msg.reply(`El usuario **${user.tag}** ya estaba antes en la lista negra.`);

            database.set(user.id, { user: user.username, discriminator: user.discriminator, id: user.id, reason: motivo, date: Date.now() });
            return msg.channel.send(`El usuario **${user.tag}** ha sido añadido a la lista negra.`);
        } else if(args![1] === 'remove') {
            if(!database.has(user.id)) return msg.reply(`El usuario **${user.tag}** no estaba antes en la lista negra.`);

            database.delete(user.id);
            return msg.channel.send(`El usuario **${user.tag}** ha sido sacado de la lista negra.`);
        } else {
            if(!args![2]) return msg.reply(`${bot.getEmoji("noargs")} Escribe la ID del usuario que quieres buscar en la lista negra.`);
            if(!database.has(args![2])) return msg.reply(`El usuario **${user.tag}** no se encontró en la lista negra.`);
            const embed: DJBotEmbed = new DJBotEmbed(msg.author, msg.guild!, {});
            embed.setTitle("Busqueda en la lista negra")
            embed.addFields({ name: "Usuario", value: `${database.get(args![2]).user}#${database.get(args![2]).discriminator}` }, { name: "ID", value: database.get(args![2]).id.toString() }, { name: "Fecha de entrada", value: `<t:${Math.ceil(database.get(args![2]).date / 1000)}>` }, { name: "Motivo", value: database.get(args![2]).reason });

            return msg.channel.send({ embeds: [embed] });
        }
	} catch (error) {
	    console.error(error);
	    bot.hook.send({ embeds: [new EmbedBuilder().setColor('NotQuiteBlack').setTitle(`Error en ${this.name}`).setDescription(`${error}`)] });
	}
    }
});

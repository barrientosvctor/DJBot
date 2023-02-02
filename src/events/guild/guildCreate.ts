import { EmbedBuilder, Guild } from "discord.js";
import { DJBotEmbed } from "../../structures/DJBotEmbed";
import { Event } from "../../structures/Event";

export default new Event({
    name: "guildCreate",
    async run(bot, guild: Guild) {
        try {
            const embed: EmbedBuilder = new EmbedBuilder()
            .setThumbnail(guild.iconURL({ extension: "png", size: 2048 }))
            .setTitle(`¡${bot.user.username} ha sido añadido a un nuevo servidor!`)
            .addFields({ name: "• Información del servidor", value: `\`\`\`diff\n+ Nombre: ${guild.name}\n+ Propietario: ${bot.users.cache.get(guild.ownerId)?.username}#${bot.users.cache.get(guild.ownerId)?.discriminator}\n+ Server ID: ${guild.id}\n+ Miembros: ${guild.memberCount} (Humanos: ${guild.members.cache.filter((m) => !m.user.bot).size})\n\`\`\`` }, { name: `• Estadísticas de ${bot.user.tag}`, value: `\`\`\`diff\n- Servidores: ${bot.guilds.cache.size.toLocaleString()}\n- Usuarios: ${bot.users.cache.size.toLocaleString()}\n- Canales: ${bot.channels.cache.size.toLocaleString()}\n- Emotes: ${bot.emojis.cache.size.toLocaleString()}\n\`\`\`` })
            .setColor("DarkGreen")
            .setTimestamp();
            bot.hook.send({ embeds: [embed] });
        } catch (error) {
            console.error(error);
            bot.hook.send({ embeds: [new EmbedBuilder().setColor('NotQuiteBlack').setTitle(`Error en el evento ${this.name}`).setDescription(`${error}`)] });
        }
    }
});

import { ChatInputCommandInteraction, EmbedBuilder } from "discord.js";
import { Database } from "../../structures/Database";
import { Event } from "../../structures/Event";
import { Interaction } from "../../structures/Interaction";
import validations from "../../utils/validations.json";

export default new Event({
    name: "interactionCreate",
    async run(bot, int: ChatInputCommandInteraction<"cached">) {
        try {
            const slashCommand: Interaction | undefined = bot.slash.get(int.commandName);
            if (!slashCommand) return int.editReply(`Este comando no existe.`);
            if (!int.isChatInputCommand()) return;

            await int.deferReply({ ephemeral: false }).catch(err => console.error(err));

            if (!slashCommand.enabled) return int.editReply(`Este comando no está disponible en este momento, intenta usarlo más tarde.`);
            if (bot.checkBlacklist(int.user)) {
                const blacklistDB: Database = new Database("./src/databases/blacklist.json");
                return int.editReply(`${bot.getEmoji("sad")} No puedes usar mis comandos debido a que estás en la lista negra del bot.\nMotivo: ${await blacklistDB.get(int.user.id).reason}`).then(message => setTimeout(() => message.delete(), 20000));
            }
            if (slashCommand.djOnly) {
                if (await bot.checkDJ(int.guild, int.member!) === false) {
                    const djDB: Database = new Database("./src/databases/djrole.json");
                    return int.editReply(`${bot.getEmoji("error")} No puedes usar este comando debido a que en el servidor se ha configurado un rol de DJ. Necesitas tener el rol <@&${await djDB.get(int.guildId)}> para usar este comando.`).then(message => setTimeout(() => message.delete(), 10000)).catch(() => {});
                }
            }
            if (slashCommand.botPermissions && !int.guild.members.me?.permissions.has(slashCommand.botPermissions)) return int.editReply(`¡No tengo los permisos suficientes para ejecutar la acción de este comando!\nPermisos requeridos: ${slashCommand.botPermissions?.map(perm => `**${validations.guild.roles.permissions[perm]}**`).join(', ')}`);
            if (slashCommand.memberPermissions && !int.member.permissions.has(slashCommand.memberPermissions)) return int.editReply(`¡No tienes los permisos suficientes para usar este comando!\nPermisos requeridos: ${slashCommand.memberPermissions?.map(perm => `**${validations.guild.roles.permissions[perm]}**`).join(', ')}`);
            if (slashCommand.channelOnly && !int.member.voice.channel) return int.editReply("¡Necesitas estar en un canal de voz para usar este comando!").then(message => setTimeout(() => message.delete(), 10000)).catch(() => {});
            if (slashCommand.sameChannel) {
                if (int.guild.members.me?.voice.channel) {
                    if (int.member.voice.channel) {
                        if (int.member.voice.channel.id !== int.guild.members.me?.voice.channel?.id) return int.editReply(`¡Debes de unirte al mismo canal de voz que estoy para usar este comando!`).then(message => setTimeout(() => message.delete(), 10000)).catch(() => {});
                    }
                }
            }
            if (slashCommand.checkQueue) {
                if (!bot.distube.getQueue(int.guildId) || bot.distube.getQueue(int.guildId)?.songs.length === 0) return int.editReply(`No hay ninguna canción en la lista.`).then(message => setTimeout(() => message.delete(), 10000)).catch(() => {});
            }

            try {
                slashCommand.callback({ bot, int });
                bot.hook.send(`• ──────── ✾ Slash ✾ ──────── •\nâ€¢ **Comando:** ${slashCommand.name}\nâ€¢ **Usuario:** ${int.user.tag} (\`${int.user.id}\`)\nâ€¢ **Servidor:** ${int.guild.name} (\`${int.guildId}\`)`);
            } catch (error) {
                console.error(error);
            }
        } catch (error) {
            console.error(error);
            bot.hook.send({ embeds: [new EmbedBuilder().setColor('NotQuiteBlack').setTitle(`Error en el evento ${this.name}`).setDescription(`${error}`)] });
        }
    }
});

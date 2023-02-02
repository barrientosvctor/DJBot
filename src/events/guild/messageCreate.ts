import { Event } from "../../structures/Event";
import { Collection, EmbedBuilder, Message } from "discord.js";
import { Command } from "../../structures/Command";
import { Database } from "../../structures/Database";
import validations from "../../utils/validations.json";
import { DJBotEmbed } from "../../structures/DJBotEmbed";
const Timeout = new Map();

export default new Event({
    name: "messageCreate",
    async run(bot, msg: Message) {
        try {
            let prefix: string = await bot.getPrefix(msg.guildId!);
            if(msg.content.match(new RegExp(`^<@!?${bot.user.id}>( |)$`))) msg.reply({ embeds: [new DJBotEmbed(msg.author, msg.guild!, { title: 'Mensaje de introducción', description: `> **¡Hola ${msg.author.username}!** Soy ${bot.user.username}, un bot dedicado a la reproducción de música de YouTube, Spotify y SoundCloud en canales de voz de Discord.\n\n> Cuento con comandos de **barra (/)** y comandos de **prefix (${prefix})**.\n\n> Para empezar a usar mis comandos, puedes revisar los que tengo disponibles con \`${prefix}help\` o con /help.` })] });

            const args: string[] = msg.content.substring(prefix.length).split(" ");
            const command: Command | undefined = bot.commands.get(args[0]) || bot.commands.get(bot.aliases.get(args[0])!);

            if (!args[0] || !msg.guild || msg.author.bot || !msg.content.startsWith(prefix)) return;

            if (command) {
                if (!command.enabled) return msg.reply(`${bot.getEmoji("error")} Este comando está deshabilitado temporalmente.`);
                if (bot.checkBlacklist(msg.author)) {
                    const blacklistDB: Database = new Database("./src/databases/blacklist.json");
                    return msg.reply(`${bot.getEmoji("sad")} No puedes usar mis comandos debido a que estás en la lista negra del bot.\nMotivo: ${await blacklistDB.get(msg.author.id).reason}`).then(message => setTimeout(() => message.delete(), 20000));
                }
                if (command.djOnly) {
                    if (await bot.checkDJ(msg.guild, msg.member!) === false) {
                        const djDB: Database = new Database("./src/databases/djrole.json");
                        return msg.reply(`${bot.getEmoji("error")} No puedes usar este comando debido a que en el servidor se ha configurado un rol de DJ. Necesitas tener el rol <@&${await djDB.get(msg.guildId!)}> para usar este comando.`).then(message => setTimeout(() => message.delete(), 10000)).catch(() => {});
                    }
                }

                if (command.ownerOnly && ![bot.application.owner?.id, process.env.DEV_ID].includes(msg.author.id)) return;
                if (!msg.member?.permissions.has(command.memberPerms || [])) return msg.reply(`Para usar este comando, necesitas un rol que tenga los siguientes permisos:\n- ${command.memberPerms?.map(perm => `**${validations.guild.roles.permissions[perm]}**`).join(', ')}.`);
                if (!msg.guild.members.me?.permissions.has(command.botPerms || [])) return msg.reply(`Necesito un rol que tenga de los siguientes permisos para poder ejecutar el comando:\n- ${command.botPerms?.map(perm => `**${validations.guild.roles.permissions[perm]}**`).join(', ')}.`);

                if (command.channelOnly && !msg.member?.voice.channel) return msg.reply("¡Necesitas estar en un canal de voz para usar este comando!").then(message => setTimeout(() => message.delete(), 10000)).catch(() => {});
                if (command.sameChannel) {
                    if (msg.guild.members.me?.voice.channel) {
                        if (msg.member.voice.channel) {
                            if (msg.member?.voice.channel.id !== msg.guild.members.me?.voice.channel?.id) return msg.reply(`${bot.getEmoji("error")} ¡Debes de unirte al mismo canal de voz que estoy para usar este comando!`).then(message => setTimeout(() => message.delete(), 10000)).catch(() => {});
                        }
                    }
                }
                if (command.checkQueue) {
                    if (!bot.distube.getQueue(msg.guildId!) || bot.distube.getQueue(msg.guildId!)?.songs.length === 0) return msg.reply(`${bot.getEmoji("error")} No hay ninguna canción en la lista.`).then(message => setTimeout(() => message.delete(), 10000)).catch(() => {});
                }


                // Cooldown
                if (command.cooldown) {
                    if (!Timeout.has(command.name)) Timeout.set(command.name, new Collection());

                    const time_stamps = Timeout.get(command.name);
                    const cooldown_amount: number = (command.cooldown) * 1000;

                    if (time_stamps.has(msg.author.id)) {
                        const expiration_time = time_stamps.get(msg.author.id) + cooldown_amount;

                        if (Date.now() < expiration_time) {
                            const time_left: number = (expiration_time - Date.now()) / 1000;
                            return msg.channel.send(`${bot.getEmoji("wait")} Oye no tan rápido! Espera ${time_left >= 2 ? `${time_left.toFixed(0)} segundos` : time_left === 1 ? `*1 segundo*` : "unos segundos más"} para volver a usar el comando **${command.name}**.`).then(m => setTimeout(() => m.delete(), cooldown_amount)).catch(err => {});
                        }
                    }
                    time_stamps.set(msg.author.id, Date.now());
                    setTimeout(() => time_stamps.delete(msg.author.id), cooldown_amount);
                }

                try {
                    command.run(bot, msg, args, prefix);
                    bot.hook.send(`• ──────── ✾ Message ✾ ──────── •\nâ€¢ **Comando:** ${command.name}\nâ€¢ **Usuario:** ${msg.author.tag} (\`${msg.author.id}\`)\nâ€¢ **Servidor:** ${msg.guild.name} (\`${msg.guildId}\`)`);
                } catch (error) {
                    console.error(error);
                }
            } else return;
        } catch (error) {
            console.error(error);
            bot.hook.send({ embeds: [new EmbedBuilder().setColor('NotQuiteBlack').setTitle(`Error en el evento ${this.name}`).setDescription(`${error}`)] });
        }
    }
});

import { EmbedBuilder } from "discord.js";
import { Command } from "../../../structures/Command";
import { DJBotEmbed } from "../../../structures/DJBotEmbed";

export default new Command({
    name: "help",
    description: "Muestra información de comandos de DJ Bot.",
    usage: "[comando]",
    cooldown: 3,
    aliases: ["h"],
    enabled: true,
    run(bot, msg, args, prefix) {
        try {
            if (!args![1]) {
                let list: string[] = [];
                for (const command of bot.commands.values()) {
                    if (command.ownerOnly) continue;
                    list.push(`\`${prefix}${command.name}\` - ${command.description}`);
                }
                return msg.reply({ embeds: [new DJBotEmbed(msg.author, msg.guild!, { description: list.join('\n') })] });
            } else {
                let command: Command | undefined = bot.commands.get(args![1].toLowerCase()) || bot.commands.get(bot.aliases.get(args![1])!);
                if (!command) return msg.reply(`El comando *${args![1]}* no existe, asegúrate de haber escrito bien su nombre.`);

                if (command.ownerOnly && ![bot.application.owner?.id, process.env.DEV_ID].includes(msg.author.id)) return;

                return msg.reply({ embeds: [new DJBotEmbed(msg.author, msg.guild!, {}).setTitle(`Información del comando \`${command.name}\``).addFields({ name: "~ Nombre", value: command.name }, { name: "~ Descripción", value: command.description }, { name: "~ Uso", value: command.usage ? `${prefix}${command.name} ${command.usage}` : `${prefix}${command.name}` }, { name: "~ Habilitado (global)", value: command.enabled ? "Sí" : "No" }, { name: "~ ¿Requiere rol DJ?", value: command.djOnly ? "Sí" : "No" })] });
            }
        } catch (error) {
            console.error(error);
            bot.hook.send({ embeds: [new EmbedBuilder().setColor('NotQuiteBlack').setTitle(`Error en ${this.name}`).setDescription(`${error}`)] });
        }
    }
});

import { Command } from "../../../structures/Command";
import { inspect } from "util";
import { DJBotEmbed } from "../../../structures/DJBotEmbed";
import { EmbedBuilder } from "discord.js";

export default new Command({
    name: "eval",
    description: "Evalua código TypeScript.",
    cooldown: 3,
    aliases: ["ev", "evaluate"],
    enabled: true,
    ownerOnly: true,
    run(bot, msg, args) {
        try {
            if(!args![1]) return msg.channel.send(`${bot.getEmoji("noargs")} Escribe el código JavaScript que voy a evaluar.`);

            const embed: DJBotEmbed = new DJBotEmbed(msg.author, msg.guild!, {});
            let result;
            try {
                result = inspect(eval(args!.slice(1).join(" ")), { depth: 0 });
            } catch (error) {
                result = error;
            }

            embed.setTitle("Código evaluado")
            embed.setDescription(`**Tipo**\n\`\`\`\n${typeof(eval(args!.slice(1).join(' ')))}\n\`\`\`\n\n**Resultado**\n\`\`\`\n${result}\n\`\`\``);
            return msg.reply({ embeds: [embed] });
        } catch (error) {
            console.error(error);
            bot.hook.send({ embeds: [new EmbedBuilder().setColor('NotQuiteBlack').setTitle(`Error en ${this.name}`).setDescription(`${error}`)] });
        }
    }
});

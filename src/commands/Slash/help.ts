import { DJBotEmbed } from "../../structures/DJBotEmbed";
import { Interaction } from "../../structures/Interaction";
const cmdList: string[] = [];

export default new Interaction()
.setName("help")
.setDescription("Muestra cierta información de los comandos de DJ Bot.")
.addStringOption(opt => opt.setName("comando").setDescription("En este campo escribe el nombre del comando que quieres tener más información."))
.setEnabledCommand(true)
.setCallback(async ({ bot, int }) => {
    try {
	const arg: string = int.options.getString("comando")!;
	if (!arg) {
	    for (const slash of bot.slash.values()) {
		cmdList.push(`\`/${slash.name}\` - ${slash.description}`);
	    }
	    return int.editReply({ embeds: [new DJBotEmbed(int.user, int.guild, { description: cmdList.join("\n") })] });
	} else {
	    const slashCommand: Interaction | undefined = bot.slash.get(arg.toLowerCase());
	    if (!slashCommand) return int.editReply(`El comando *${arg}* no existe. Asegúrate de escribir bien su nombre o de ver mis comandos con /help.`);
	    return int.editReply({ embeds: [new DJBotEmbed(int.user, int.guild, {}).setTitle(`Información del comando ${slashCommand.name}`).addFields({ name: "~ Nombre", value: slashCommand.name }, { name: "~ Descripción", value: slashCommand.description }, { name: "~ Habilitado (global)", value: slashCommand.enabled ? "Sí" : "No" }, { name: "~ Argumentos", value: slashCommand.options ? "Sí" : "No" }, { name: "~ ¿Requiere rol DJ?", value: slashCommand.djOnly ? "Sí" : "No" })] })
	}
    } catch (error) {
        console.error(error);
    }
});

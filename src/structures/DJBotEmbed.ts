import { EmbedBuilder, EmbedData, Guild, User } from "discord.js";

export class DJBotEmbed extends EmbedBuilder {
    constructor(user: User, guild: Guild, data: EmbedData = {}) {
	super(data);
	
	this.setColor("#7389CC");
        this.setAuthor({ name: user.tag, iconURL: user.displayAvatarURL({ extension: "png", size: 2048 }) });
        this.setFooter({ text: data.footer ? data.footer.text ? data.footer.text : '\u200b' : guild.name, iconURL: guild.iconURL({ extension: "png", size: 2048 }) || undefined });
        this.setTimestamp();
    }
}

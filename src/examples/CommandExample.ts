import { Command } from "../../../structures/Command";

export default new Command({
    name: "",
    description: "",
    usage: "",
    cooldown: 3,
    aliases: [],
    enabled: true,
    ownerOnly: false,
    channelOnly: false,
    sameChannel: false,
    checkQueue: false,
    djOnly: false,
    memberPerms: [],
    botPerms: [],
    run(bot, msg, args) {
	try {
	    //
	} catch (error) {
	    console.error(error);
	}
    }
});

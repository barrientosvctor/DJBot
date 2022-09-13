import { Message, PermissionsString } from "discord.js";
import bot from "../DJBot"

interface CommandOptions {
    name: string;
    description: string;
    usage?: string;
    cooldown: number;
    aliases?: string[];
    enabled: boolean;
    ownerOnly?: boolean;
    channelOnly?: boolean;
    sameChannel?: boolean;
    checkQueue?: boolean;
    djOnly?: boolean;
    memberPerms?: PermissionsString[];
    botPerms?: PermissionsString[];
    run: (bot: bot, msg: Message, args?: string[], prefix?: string) => void;
}

export class Command {
    public name: CommandOptions["name"];
    public description: CommandOptions["description"];
    public usage: CommandOptions["usage"];
    public cooldown: CommandOptions["cooldown"];
    public aliases: CommandOptions["aliases"];
    public enabled: CommandOptions["enabled"];
    public ownerOnly: CommandOptions["ownerOnly"];
    public channelOnly: CommandOptions["channelOnly"];
    public sameChannel: CommandOptions["sameChannel"];
    public checkQueue: CommandOptions["checkQueue"];
    public djOnly: CommandOptions["djOnly"];
    public memberPerms: CommandOptions["memberPerms"];
    public botPerms: CommandOptions["botPerms"];
    public run: CommandOptions["run"];

    constructor(options: CommandOptions) {
	this.name = options.name;
	this.description = options.description;
	this.usage = options.usage;
	this.cooldown = options.cooldown;
	this.aliases = options.aliases;
	this.enabled = options.enabled;
	this.ownerOnly = options.ownerOnly;
	this.channelOnly = options.channelOnly;
	this.sameChannel = options.sameChannel;
	this.checkQueue = options.checkQueue;
	this.djOnly = options.djOnly;
	this.memberPerms = options.memberPerms;
	this.botPerms = options.botPerms;
	this.run = options.run;
    }
}

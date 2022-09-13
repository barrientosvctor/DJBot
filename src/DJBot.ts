import { Client, Partials, Collection, GuildMember, User, Guild, WebhookClient } from "discord.js";
import { DisTube } from "distube";
import { SpotifyPlugin } from "@distube/spotify";
import { SoundCloudPlugin } from "@distube/soundcloud";
import { Command } from "./structures/Command";
import { Interaction } from "./structures/Interaction";
import { CommandHandler, EventHandler, SlashCommandHandler, DistubeEvents } from "./handlers/index";
import { Database } from "./structures/Database";

export default class bot extends Client<true> {
    constructor() {
	super({ intents: 33409, allowedMentions: { repliedUser: false }, shards: "auto", partials: [Partials.Message, Partials.User] });
    }

    public commands: Collection<string, Command> = new Collection();
    public aliases: Collection<string, string> = new Collection();
    public slash: Collection<string, Interaction> = new Collection();
    public hook: WebhookClient = new WebhookClient({ token: process.env.HOOK_TOKEN!, id: process.env.HOOK_ID! });
    public distube: DisTube = new DisTube(this, {
	leaveOnFinish: true,
	savePreviousSongs: false,
	searchSongs: 5,
	youtubeCookie: process.env.YOUTUBE_COOKIE,
	nsfw: true,
	emitAddSongWhenCreatingQueue: false,
	emitAddListWhenCreatingQueue: false,
	plugins: [new SpotifyPlugin(), new SoundCloudPlugin()]
    });

    public start(): void {
	CommandHandler(this);
	EventHandler(this);
	SlashCommandHandler(this);
	DistubeEvents(this);
	this.login(process.env.BOT_TOKEN);
    }

    public async getPrefix(guild: string): Promise<string> {
	const prefixDB: Database = new Database("./src/databases/prefix.json");
	let prefix: string;

	if (prefixDB.has(guild)) prefix = await prefixDB.get(guild);
	else prefix = ".";

	return prefix;
    }

    public checkBlacklist(user: User): boolean {
	const blacklistDB: Database = new Database("./src/databases/blacklist.json");
	if (blacklistDB.has(user.id)) {
	    return true;
	} else {
	    return false;
	}
    }

    public async checkDJ(guild: Guild, member: GuildMember) {
	const djDB: Database = new Database("./src/databases/djrole.json");
	if (djDB.has(guild.id)) {
	    if (member.roles.cache.has(await djDB.get(guild.id))) {
		return true;
	    } else {
		return false;
	    }
	}
    }

    public getEmoji(emojiType: string): string | string[] | undefined {
	interface EmojiListStructure {
	    check: string | string[];
	    error: string | string[];
	    noargs: string | string[];
	    sad: string | string[];
	    wait: string | string[];
	    warning: string | string[];
	    search: string | string[];
	    djbot: string | string[];
	}

	const emojiList: EmojiListStructure = {
	    check: ["✅"],
	    error: ["❌"],
	    noargs: ["❗"],
	    sad: ["😔", "😕", "😞", "😟", "🙁", "☹️", "😢", "😭"],
	    wait: ["<a:waiting:1019010655434571969>"],
	    warning: ["⚠️"],
	    search: ["<a:search_loading:1006419890774736906>"],
	    djbot: "<a:disco:930248765657448448>"
	}

	const emoji: keyof EmojiListStructure = emojiType as keyof EmojiListStructure || null;

	if (!emojiList[emoji]) return undefined;
	else if (typeof emojiList[emoji] === "object") return emojiList[emoji][Math.floor(Math.random() * emojiList[emoji].length)];
	else if (typeof emojiList[emoji] === "string") return emojiList[emoji];
    }
}

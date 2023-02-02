import { PermissionsString, SlashCommandBuilder, SlashCommandSubcommandBuilder, SlashCommandSubcommandGroupBuilder } from "discord.js";
import type { ChatInputCommandInteraction } from "discord.js";
import bot from "../DJBot";

export class Interaction extends SlashCommandBuilder {
    public enabled!: boolean;

    public setEnabledCommand(opt: boolean) {
        this.enabled = opt;
        return this;
    }

    public botPermissions!: PermissionsString[];

    public setBotPermissions(perms: PermissionsString[]) {
        this.botPermissions = perms;
        return this;
    }

    public memberPermissions!: PermissionsString[];

    public setMemberPermissions(perms: PermissionsString[]) {
        this.memberPermissions = perms;
        return this;
    }

    public channelOnly!: boolean;

    public setChannelOnly(opt: boolean) {
        this.channelOnly = opt;
        return this;
    }

    public sameChannel!: boolean;

    public setSameChannel(opt: boolean) {
        this.sameChannel = opt;
        return this;
    }

    public checkQueue!: boolean;

    public setCheckQueue(opt: boolean) {
        this.checkQueue = opt;
        return this;
    }

    public djOnly!: boolean;

    public setDJOnly(opt: boolean) {
        this.djOnly = opt;
        return this;
    }

    public callback!: InteractionFunction;

    public setCallback(fn: InteractionFunction) {
        this.callback = fn;
        return this;
    }

    public override addSubcommand(input: | SlashCommandSubcommandBuilder | ((subCommandGroup: SlashCommandSubcommandBuilder) => SlashCommandSubcommandBuilder)) {
        super.addSubcommand(input);
        return this;
    }

    public override addSubcommandGroup(input: | SlashCommandSubcommandGroupBuilder | ((subCommandGroup: SlashCommandSubcommandGroupBuilder) => SlashCommandSubcommandGroupBuilder)) {
        super.addSubcommandGroup(input);
        return this;
    }
}

type InteractionFunction = (idk: {
    bot: bot;
    int: ChatInputCommandInteraction<"cached">;
}) => unknown;

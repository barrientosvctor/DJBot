import { ClientEvents } from "discord.js"
import bot from "../DJBot"

interface EventOptions {
    name: keyof ClientEvents;
    once?: boolean;
    run: (bot: bot, ...args: any[]) => void;
}

export class Event {
    public name: EventOptions["name"];
    public once: EventOptions["once"];
    public run: EventOptions["run"];

    constructor(options: EventOptions) {
        this.name = options.name;
        this.once = options.once;
        this.run = options.run;
    }
}

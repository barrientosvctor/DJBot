import { Message, MessageResolvable } from "discord.js";
import bot from "../DJBot";
let lastMessage: string | undefined;

export function DistubeEvents(bot: bot) {
    bot.distube.on("initQueue", queue => {
        queue.autoplay = false;
        queue.volume = 100;
    });
    bot.distube.on("playSong", async (queue, song) => {
        const message: Message<true> | undefined = await queue.textChannel?.send(`${bot.getEmoji("djbot")} Está sonando **${song.name}** (${song.formattedDuration})`);
        lastMessage = message?.id;
    });
    bot.distube.on("addSong", (queue, song) => queue.textChannel?.send(`${bot.getEmoji("check")} La canción **${song.name}** (${song.formattedDuration}) acaba de ser añadido a la lista.`));
    bot.distube.on("addList", (queue, playlist) => queue.textChannel?.send(`${bot.getEmoji("check")} La lista de reproducción **${playlist.name}** ha sido añadida a la lista de canciones.`));
    bot.distube.on("finishSong", async (queue, song) => {
        const playSongMessage: MessageResolvable = lastMessage as MessageResolvable;
        const msg: Message<true> | false = await queue.textChannel?.messages.fetch(playSongMessage)?.catch(err => console.error(err)) || false;
        if (msg) await msg.delete().catch(() => {});
    });
    bot.distube.on("finish", queue => queue.textChannel?.send(`La lista de canciones ha terminado.`));
    bot.distube.on("empty", queue => queue.textChannel?.send("Me he ido del canal de voz porque no había nadie ahí."));
    bot.distube.on("error", (channel, error) => {
        if (channel) {
            channel.send(`${bot.getEmoji("warning")} Ha ocurrido algo inusual en el bot.`).then(errMsg => setTimeout(() => errMsg.delete(), 10000)).catch(err => console.error(err));
            console.error(error);
        }
    });

    console.log("¡Eventos Distube cargados!");
}

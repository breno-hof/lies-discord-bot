import 'dotenv/config'
import {
    Client,
    GatewayIntentBits,
    Events,
    Collection,
} from "discord.js";
import { HandleInteractions } from "./HandleInteractions";
import { ISlashCommand } from './ISlashCommand';
import { DrawSlashCommand } from './DrawCommand';
import { ListChampionsService } from './ListChampionsService';

class App {

    public main() {
        const listChampionsService = new ListChampionsService();
        const drawSlashCommand = new DrawSlashCommand(listChampionsService);
        const commands = new Collection<string, ISlashCommand>();
        const handleInteractions = new HandleInteractions(commands);
        const client = new Client({ intents: [GatewayIntentBits.Guilds] });

        client.on(Events.ClientReady, () => console.log(`Logged in as ${client.user?.tag}!`));
        client.on(Events.InteractionCreate, interaction => handleInteractions.handle(interaction));

        commands.set(drawSlashCommand.name, drawSlashCommand)

        client.login(process.env.DISCORD_TOKEN);
    }
}

new App().main();
import { Collection, Interaction } from "discord.js";
import { ISlashCommand } from "./ISlashCommand";

export class HandleInteractions {
    readonly commands: Collection<string, ISlashCommand>;
    
    constructor(commands: Collection<string, ISlashCommand>) {
        this.commands = commands;
    }

    public async handle(interaction: Interaction) {
        if (!interaction.isChatInputCommand()) return;
        
        const command = this.commands.get(interaction.commandName);

        if (command) {
            await command.execute(interaction);
        }
    }
}
import { ChatInputCommandInteraction, Interaction, RESTPostAPIChatInputApplicationCommandsJSONBody, SlashCommandBuilder } from "discord.js";
import { ISlashCommand } from "./ISlashCommand";
import { ListChampionsService } from "./ListChampionsService";
import { ApplicationUtils } from "./ApplicationUtils";

export class DrawSlashCommand implements ISlashCommand {
    readonly name: string = 'draw';
    readonly listChampionsService?: ListChampionsService;

    constructor(listChampionsService?: ListChampionsService) {
        this.listChampionsService = listChampionsService;
    }

    public data(): RESTPostAPIChatInputApplicationCommandsJSONBody {
        return new SlashCommandBuilder()
            .setName(this.name)
            .setDescription('Draw league of legends role and champion for players.')
            .addUserOption(option =>
                option.setName('user1')
                    .setDescription('The first user')
                    .setRequired(true))
            .addUserOption(option =>
                option.setName('user2')
                    .setDescription('The second user')
                    .setRequired(false))
            .addUserOption(option =>
                option.setName('user3')
                    .setDescription('The third user')
                    .setRequired(false))
            .addUserOption(option =>
                option.setName('user4')
                    .setDescription('The fourth user')
                    .setRequired(false))
            .addUserOption(option =>
                option.setName('user5')
                    .setDescription('The fifth user')
                    .setRequired(false))
            .toJSON();
    }

    public async execute(interaction: ChatInputCommandInteraction): Promise<string> {
        if (!this.listChampionsService) return 'An error has ocurred.';

        const champions = await this.listChampionsService.getListOfChampions();

        if (!champions) return 'An error has ocurred.';

        const shuffledChampions = ApplicationUtils.shuffle(champions);
        const roles = ApplicationUtils.shuffle(['Top', 'Jungle', 'Mid', 'Bottom', 'Support']);

        const [user1, user2, user3, user4, user5] = interaction.options.data;

        let text = `${this.getPlayer(user1.value, interaction)}'ll play ${shuffledChampions.shift()} as ${roles.shift()}\n`;

        if (user2) text += (`${this.getPlayer(user2.value, interaction)}'ll play ${shuffledChampions.shift()} as ${roles.shift()}\n`);
        if (user3) text += (`${this.getPlayer(user3.value, interaction)}'ll play ${shuffledChampions.shift()} as ${roles.shift()}\n`);
        if (user4) text += (`${this.getPlayer(user4.value, interaction)}'ll play ${shuffledChampions.shift()} as ${roles.shift()}\n`);
        if (user5) text += (`${this.getPlayer(user5.value, interaction)}'ll play ${shuffledChampions.shift()} as ${roles.shift()}`);

        return text;
    }

    private getPlayer(value: any, interaction: ChatInputCommandInteraction) {
        return interaction.guild?.members.cache.get(value)
    }
}
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

        const shuffledChampions = ApplicationUtils.shuffle(Array.from(champions));
        const roles = ApplicationUtils.shuffle(['Top', 'Jungle', 'Mid', 'Bottom', 'Support']);

        const [user1, user2, user3, user4, user5] = interaction.options.data;

        let text = `${user1.value}: (${shuffledChampions.shift()}, ${roles.shift()})\n`;

        if (user2) text += (`${user2.value}: (${shuffledChampions.shift()}, ${roles.shift()})\n`);
        if (user3) text += (`${user3.value}: (${shuffledChampions.shift()}, ${roles.shift()})\n`);
        if (user4) text += (`${user4.value}: (${shuffledChampions.shift()}, ${roles.shift()})\n`);
        if (user5) text += (`${user5.value}: (${shuffledChampions.shift()}, ${roles.shift()})`);

        return text;
    }
}
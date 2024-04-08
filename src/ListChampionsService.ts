export class ListChampionsService {

    public async getListOfChampions(): Promise<string[] | undefined> {
        try {
            const version = await fetch("https://ddragon.leagueoflegends.com/api/versions.json")
                .then(response => response.json())
                .then(json => json[0]);
            

            const champion = await fetch(`https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`)
                .then(response => response.json())
                .then(json => json);
                

            return Object.keys(champion.data);
        } catch (error) {
            console.error(error);
            return;
        }
    }
}
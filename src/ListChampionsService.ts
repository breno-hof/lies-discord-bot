import { error } from "console";

interface RiotChampionCDNResponse {
    data: Map<string, any>
}

export class ListChampionsService {

    public async getListOfChampions(): Promise<IterableIterator<string> | undefined> {
        try {
            const version = fetch("https://ddragon.leagueoflegends.com/api/versions.json")
                .then(response => response.json())
                .then(json => console.log(json()));

            // return fetch(`https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`)
              //  .then(response => response.json())
                //.then((json: RiotChampionCDNResponse) => json.data.keys());
            
            return;
        } catch (error) {
            console.error(error);
            return;
        }
    }
}
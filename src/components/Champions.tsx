import { Character } from "../types";
import ChampionHeader from "./ChampionHeader";
import ChampionRow from "./ChampionRow";

// Props
type Props = {
  characters: Character[]
  squad: Character[],
  toggleChamp: (id: number) => void,
  selectedTags: string[],
  tagSelected: (tag: string) => void
}
const Champions = (props: Props) => {
  const { characters, squad, toggleChamp, selectedTags, tagSelected } = props;
  // Render
  return (
    <div className="w-full">
      <div className="w-11/12 mx-auto">
        <div className="w-full">
          <ChampionHeader />
        </div>
        <div className="bg-white w-full shadow rounded-xl gap-2 flex flex-col">
          {
            characters.map(
              character => (
                <ChampionRow
                  key={character.id}
                  onToggle={toggleChamp}
                  selected={squad.findIndex(it => it.id === character.id) !== -1}
                  character={character}
                  selectedTags={selectedTags}
                  tagSelected={tagSelected}
                />
              )
            )
          }
        </div>
      </div>
    </div>
  )
}

export default Champions
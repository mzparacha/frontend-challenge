import { Character } from "../types";
// Props Types
type Props = {
  character: Character,
  onRemove: (id: number) => void
}
const ChampAvatar = (props: Props) => {
  // Props
  const { character, onRemove } = props;
  // Render
  return (
    <div className="w-[100px] h-[100px] rounded-full overflow-hidden group relative border-blue-500 border cursor-pointer" onClick={() => onRemove(character.id)}>
      <div className="hidden group-hover:grid absolute w-full h-full  place-items-center bg-blue-500/75 text-white">
        remove
      </div>
      <img
        className="w-full"
        src={character.thumbnail} alt={`${character.name} avatar`}
      />
    </div>
  )
}

export default ChampAvatar
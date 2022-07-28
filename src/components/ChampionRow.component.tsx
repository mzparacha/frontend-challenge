import { Checkbox } from "@mui/material";
import { useEffect, useState } from "react";
import { AbilitySet, Character, CharacterAbility } from "../types";
import Tag from "./Tag.component";
import { v4 as uuidv4 } from 'uuid';

// Props
type Props = {
  character: Character,
  selected: boolean,
  onToggle: (id: number) => void,
  tagSelected: (tag: string) => void,
  selectedTags: string[]
}

const ChampionRow = (props: Props) => {
  const { character, selected, onToggle, tagSelected, selectedTags } = props;
  const [stats, setStats] = useState<AbilitySet>({
    power: 0,
    mobility: 0,
    technique: 0,
    survivability: 0,
    energy: 0
  });
  //methods
  const methods = {
    onMount: () => {
      const { abilities } = character;
      const reduction = abilities.reduce((acc: any, it: CharacterAbility) => {
        acc[it.abilityName.toLowerCase()] = it.abilityScore;
        return acc;
      }, {})
      setStats(reduction);
    },
    onSelect: () => {
      onToggle(character.id);
    },
  };
  // Effects
  useEffect(() => {
    methods.onMount();
  }, [])
  // Render
  return (
    <div className="flex w-full border-stone-200 border-b p-3" id="champs-row">
      <div className="w-[45%] flex">
        <div className="w-1/2">
          <Checkbox checked={selected} onChange={methods.onSelect} />
          {
            character.name
          }
        </div>
        <div className="w-1/2 flex gap-1 flex-wrap">{
          character.tags && character.tags.length > 0 && character.tags.map((tag) =>
          (
            <Tag
              key={uuidv4()}
              tag={tag.tag_name}
              selected={selectedTags.includes(tag.tag_name)}
              onClick={tagSelected}
            />
          )
          )
        }</div>
      </div>
      <div className="w-[55%] flex">
        <div className={`w-1/5 ${stats.power === 10 ? 'text-red-500 font-bold' : ''}`}>{stats.power}</div>
        <div className={`w-1/5 ${stats.mobility === 10 ? 'text-red-500 font-bold' : ''}`}>{stats.mobility}</div>
        <div className={`w-1/5 ${stats.technique === 10 ? 'text-red-500 font-bold' : ''}`}>{stats.technique}</div>
        <div className={`w-1/5 ${stats.survivability === 10 ? 'text-red-500 font-bold' : ''}`}>{stats.survivability}</div>
        <div className={`w-1/5 ${stats.energy === 10 ? 'text-red-500 font-bold' : ''}`}>{stats.energy}</div>
      </div>
    </div>
  )
}

export default ChampionRow
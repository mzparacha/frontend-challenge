import jsonData from '../data/characters.json'
import type { AbilitySet, Character, CharacterAbility } from '../types'
import { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import Champions from "./Champions.component";
import Search from "./Search.component";
import StatsBox from "./StatsBox.component";
import Tags from "./Tags.component";
import ChampAvatar from './ChampAvatar.component';
import { v4 as uuidv4 } from 'uuid';
const data: Character[] = jsonData as Character[];
const defaultStats = [
  {
    key: "power",
    label: 'Power',
    value: 0,
  },
  {
    key: "mobility",
    label: 'Mobility',
    value: 0,
  },
  {
    key: "technique",
    label: 'Technique',
    value: 0,
  },
  {
    key: "survivability",
    label: 'Survivability',
    value: 0,
  },
  {
    key: "energy",
    label: 'Energy',
    value: 0,
  },
];
const extra = {
  key: "force",
  label: 'Force',
  value: 0,
}
// Props
type Props = {}
const Filter = (props: Props) => {
  // State
  const [champs, setChamps] = useState<Character[]>([]);
  const [avgChanged, setAvgChanged] = useState<number>(1);
  const [searchText, setSearchText] = useState('');
  const [squad, setSquad] = useState<Character[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [avgStats, setAvgStats] = useState(defaultStats)
  const toggleChamp = (id: number) => {
    const idx = squad.findIndex(x => x.id === id);
    let newSquad: Character[] = [];
    if (idx !== -1) {
      newSquad = squad.filter(i => i.id !== id);
    } else {
      const champ = champs.find(i => i.id === id)
      if (champ) {
        newSquad = [...squad, champ]
      }
    }
    if (newSquad.length > 0) {
      addAvatar(newSquad);
    } else {
      setAvgStats(defaultStats);
    }
    setSquad(newSquad);
  };
  const toggleTag = (tag: string) => {
    let newSelected: string[] = [];
    if (selectedTags.includes(tag)) {
      newSelected = selectedTags.filter(t => t !== tag);
    } else {
      newSelected = [...selectedTags, tag];
    }
    filterCharacters(newSelected,searchText);
    setSelectedTags(newSelected);
  };
  const filterCharacters = (newTags: string[] = [], text = '') => {
    const newData = data.filter(character => (
      newTags.length === 0
      ||
      (character.tags && character.tags.length > 0
        && newTags.every(t => character.tags.map(it => it.tag_name).includes(t)))

    ));
    const secondData = newData.filter(character => (text === ''
      || character.name.toLowerCase() === text.toLowerCase()
      || character.name.toLowerCase().includes(text.toLowerCase())
    ))
    setChamps(secondData);
  };
  const clearAll = () => {
    if (selectedTags.length > 0) {
      setSelectedTags([]);
    }
  };
  const addAvatar = (newSquad: Character[]) => {
    const values: AbilitySet[] = [];
    const avg: AbilitySet = {
      power: 0,
      mobility: 0,
      technique: 0,
      survivability: 0,
      energy: 0,
    };
    newSquad.forEach(character => {
      const { abilities } = character;
      const reduction = abilities.reduce((acc: any, it: CharacterAbility) => {
        acc[it.abilityName.toLowerCase()] = it.abilityScore;
        return acc;
      }, {})
      values.push(reduction);
    });
    const tempAvgStat = avgStats;
    values.forEach((it, index) => {
      Object.entries(it).forEach(([key, val]) => {
        let tempAvg = 0;
        switch (key) {
          case 'power':
            avg.power += val;
            tempAvg = avg.power / newSquad.length;
            break;
          case 'mobility':
            avg.mobility += val;
            tempAvg = avg.mobility / newSquad.length;
            break;
          case 'technique':
            avg.technique += val;
            tempAvg = avg.technique / newSquad.length;
            break;
          case 'survivability':
            avg.survivability += val;
            tempAvg = avg.survivability / newSquad.length;
            break;
          case 'energy':
            avg.energy += val;
            tempAvg = avg.energy / newSquad.length;

            break;
          default:
            ;
        }
        if (newSquad.length === index + 1) {
          const idx = tempAvgStat.findIndex(t => t.key === key);
          tempAvgStat[idx].value = parseFloat((tempAvg).toFixed(1));
        }
      });
    });
    setAvgStats(tempAvgStat);
  }
  const changedText = (text: string) => {
    setSearchText(text)
    filterCharacters(selectedTags, text);
  }
  // 
  useEffect(() => {
    setChamps(data)
  }, [])
  // Render
  return (
    <Layout>
      <div className="mx-auto container  flex flex-col w-100 gap-y-10">
        {
          squad.length < 1 && <div className="text-xl font-bold w-full text-center">
            Select your squad to defend earthrealm
          </div>
        }{
          squad.length > 0 && <div className="flex flex-col items-center">
            <div className="text-xl font-bold w-full text-center">
              Your Champions
            </div>
            <div className="flex justify-center">
              {
                squad.map(character => (
                  <ChampAvatar key={uuidv4()} character={character} onRemove={toggleChamp} />
                ))
              }
            </div>
          </div>
        }
        <div className="min-w-2/6 mx-auto gap-y-10 flex flex-col">
          <div className="flex justify-center gap-4">
            {
              avgStats.map((stat, idx) => (
                <>
                  {
                    <StatsBox key={stat.key} label={stat.label} value={stat.value} />
                  }
                </>
              ))
            }
          </div>
          <div className="text-xs text-stone-400">
            * Totals as average for squad
          </div>
        </div>
        <div className="flex justify-center">
          <Search onChange={changedText} />
        </div>
        <div className="w-full">
          <Tags selectedTags={selectedTags} setTags={toggleTag} clearAll={clearAll} />
        </div>
        <div className="w-full">
          <Champions
            toggleChamp={toggleChamp}
            squad={squad}
            characters={champs}
            selectedTags={selectedTags}
            tagSelected={toggleTag}
          />
        </div>
      </div>
    </Layout>
  )
}
export default Filter
import jsonData from "../data/characters.json";
import type { AbilitySet, Character } from "../types";
import { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import Champions from "./Champions";
import Search from "./Search";
import StatsBox from "./StatsBox";
import Tags from "./Tags";
import ChampAvatar from "./ChampAvatar";
import { v4 as uuidv4 } from "uuid";
const data: Character[] = jsonData as Character[];
// Default stats values
const defaultStats = [
  {
    key: "power",
    label: "Power",
    value: 0,
  },
  {
    key: "mobility",
    label: "Mobility",
    value: 0,
  },
  {
    key: "technique",
    label: "Technique",
    value: 0,
  },
  {
    key: "survivability",
    label: "Survivability",
    value: 0,
  },
  {
    key: "energy",
    label: "Energy",
    value: 0,
  },
];
// Props
const Filter = () => {
  // State
  const [champs, setChamps] = useState<Character[]>([]);
  const [searchText, setSearchText] = useState("");
  const [squad, setSquad] = useState<Character[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [avgStats, setAvgStats] = useState(defaultStats);
  // UseEffects
  // Effect to load all the characters from the json file on mount
  useEffect(() => {
    setChamps(data);
  }, []);
  // Methods
  /* Methods to add/remove a character from the squad */
  const toggleChamp = (id: number) => {
    const idx = squad.findIndex((x) => x.id === id);
    let newSquad: Character[] = [];
    if (idx !== -1) {
      newSquad = squad.filter((i) => i.id !== id);
    } else {
      const champ = champs.find((i) => i.id === id);
      if (champ) {
        newSquad = [...squad, champ];
      }
    }
    calculateAverages(newSquad);
    setSquad(newSquad);
  };
  /* Method to add/remove a tag from the selected tags list */
  const toggleTag = (tag: string) => {
    let newSelected: string[] = [];
    if (selectedTags.includes(tag)) {
      newSelected = selectedTags.filter((t) => t !== tag);
    } else {
      newSelected = [...selectedTags, tag];
    }
    filterCharacters(newSelected, searchText);
    setSelectedTags(newSelected);
  };
  /* Method to handle filteration of all characters based on searchquery and tags */
  const filterCharacters = (newTags: string[] = [], text = "") => {
    const newData = data.filter(
      (character) =>
        (newTags.length === 0 ||
          (character.tags &&
            character.tags.length > 0 &&
            newTags.every((t) =>
              character.tags.map((it) => it.tag_name).includes(t)
            ))) &&
        (text === "" ||
          character.name.toLowerCase() === text.toLowerCase() ||
          character.name.toLowerCase().includes(text.toLowerCase()) ||
          (character.tags &&
            character.tags.length > 0 &&
            text !== "" &&
            character.tags.some((it) =>
              it.tag_name.includes(text.toLowerCase())
            )))
    );
    setChamps(newData);
  };
  /* Method to clear all the selected tags */
  const clearAll = () => {
    if (selectedTags.length > 0) {
      setSelectedTags([]);
    }
  };
  /* Method to calculate the average stats for the selected characters */
  const calculateAverages = (newSquad: Character[]) => {
    const avg = {
      power: 0,
      mobility: 0,
      technique: 0,
      survivability: 0,
      energy: 0,
    };
    newSquad.forEach((character) => {
      const { abilities } = character;
      abilities.forEach((item) => {
        avg[item.abilityName.toLowerCase() as keyof AbilitySet] +=
          item.abilityScore;
      });
    });
    const divideBy = newSquad.length > 0 ? newSquad.length : 1;
    const tempAvgStat = avgStats.map((item) => {
      item.value = parseFloat(
        (avg[item.key as keyof AbilitySet] / divideBy).toFixed(2)
      );
      return item;
    });
    setAvgStats(tempAvgStat);
  };
  const changedText = (text: string) => {
    /* Method to handle the change in search textfield */
    setSearchText(text);
    filterCharacters(selectedTags, text);
  };

  // Render
  return (
    <Layout>
      <div className="mx-auto container  flex flex-col w-100 gap-y-10">
        {squad.length === 0 && (
          <div className="text-xl font-bold w-full text-center">
            Select your squad to defend earthrealm
          </div>
        )}
        {squad.length > 0 && (
          <div className="flex flex-col items-center">
            <div className="text-xl font-bold w-full text-center">
              Your Champions
            </div>
            <div className="flex justify-center">
              {squad.map((character) => (
                <ChampAvatar
                  key={uuidv4()}
                  character={character}
                  onRemove={toggleChamp}
                />
              ))}
            </div>
          </div>
        )}
        <div className="min-w-2/6 mx-auto gap-y-10 flex flex-col">
          <div className="flex justify-center gap-4">
            {avgStats.map((stat) => (
              <StatsBox key={uuidv4()} label={stat.label} value={stat.value} />
            ))}
          </div>
          <div className="text-xs text-stone-400">
            * Totals as average for squad
          </div>
        </div>
        <Search onChange={changedText} />
        <Tags
          selectedTags={selectedTags}
          setTags={toggleTag}
          clearAll={clearAll}
        />
        <Champions
          toggleChamp={toggleChamp}
          squad={squad}
          characters={champs}
          selectedTags={selectedTags}
          tagSelected={toggleTag}
        />
      </div>
    </Layout>
  );
};
export default Filter;

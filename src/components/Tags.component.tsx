import { useEffect, useState } from "react";
import { getAllTags } from "../core/allTags";
import Tag from "./Tag.component";
// Props
type Props = {
  selectedTags: string[],
  setTags: (tag: string) => void,
  clearAll: () => void
}
const Tags = (props: Props) => {
  const { selectedTags = [], setTags } = props;
  const [allTags, setAllTags,] = useState<string[]>([
  ]);
  //methods
  const methods = {
    clearAll: () => {

    }
  };
  // Effects
  useEffect(() => {
    const tags = getAllTags();
    setAllTags(tags);
  }, [])
  // Render
  return (
    <div className="flex flex-wrap gap-2" >
      {
        allTags && allTags.map((tag: any) => (
          <Tag
            selected={selectedTags.includes(tag)}
            onClick={() => setTags(tag)}
            key={tag}
            tag={tag} />
        )
        )
      }
      {
        selectedTags.length !== 0 && <div className="underline cursor-pointer text-stone-500" onClick={methods.clearAll}>Clear all</div>
      }
    </div>
  )
}
export default Tags
import CheckIcon from '@mui/icons-material/Check';
// Props
type Props = {
  tag: string,
  onClick: (tag: string) => void,
  selected: boolean
}
const Tag = (props: Props) => {
  // State
  const { tag, onClick, selected } = props;
  //methods
  const methods = {
    //
  };
  // Effects
  // Render
  return (
    <div
      onClick={() => onClick(tag)}
      className={
        [
          "py-1 border-blue-500 border rounded-3xl px-4 cursor-pointer flex items-center w-fit",
          !selected ? "bg-white text-blue-500" : "text-white bg-blue-500"
        ].join(" ")
      }>
      {selected && <CheckIcon className=" !text-xl !stroke-4 mr-1" />}
      {tag}
    </div>
  )
}

export default Tag
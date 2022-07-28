// Props
type Props = {
  value: number,
  label: string,
}
const StatsBox = (props: Props) => {
  const { value, label } = props;
  //methods
  // Render
  return (
    <div className={`min-w-[100px] ${label === 'Technique' ? 'bg-gradient-to-t from-transparent via-black to-transparent' : ''}`}>
      <div className="bg-body h-full w-[99%] mx-auto flex flex-col items-center gap-y-5">
        <div className="h-1/2 w-full text-center">{label}</div>
        <div className="h-1/2 w-full text-center font-extrabold">{value}</div>
      </div>
    </div>

  )
}

export default StatsBox
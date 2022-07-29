const ChampionHeader = () => {
  // Render
  return (
    <div className="flex w-full font-bold p-3" id="champs-header">
      <div className="w-[45%] flex">
        <div className="w-1/2">Character</div>
        <div className="w-1/2">Tags</div>
      </div>
      <div className="w-[55%] flex">
        <div className="w-1/5">Power</div>
        <div className="w-1/5">Mobility</div>
        <div className="w-1/5">Technique</div>
        <div className="w-1/5">Survivability</div>
        <div className="w-1/5">Energy</div>
      </div>
    </div>
  )
}
export default ChampionHeader
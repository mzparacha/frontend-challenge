
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';

// Props Types
type Props = {
  onChange: (value: string) => void
}
// Component
const Search = (props: Props) => {
  const { onChange } = props;
  // State
  const [searchText, setSearchText] = useState('')
  //methods
  const search = (e: any) => {
    e.preventDefault();
    setSearchText(e.target.value);
    onChange(e.target.value);
  }
  // Render
  return (
    <div className="flex justify-center">
      <div className="mx-auto w-3/4 relative min-h-[1px] flex justify-center items-center">
        <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-black to-transparent">
        </div>
        <div className="z-[1] bg-white p-0 min-w-[400px]">
          <form onSubmit={search}>
            <TextField
              className='!m-0 !w-full'
              id="outlined-start-adornment"
              value={searchText}
              onChange={search}
              InputProps={{
                classes: {
                  input: '!py-2'
                },
                placeholder: 'Search Characters',
                startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
              }}
            />
          </form>
        </div>
      </div>
    </div>
  )
}

export default Search
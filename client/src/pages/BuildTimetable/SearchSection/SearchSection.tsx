import "./SearchSection.style.scss";
import { useState } from 'react';




interface SearchSectionProps {
  onSearch: (program:string) => void;
}
function SearchSection({ onSearch }: SearchSectionProps) {
  const [selectedValue, setSelectedValue] = useState<string>('');

const handleChange = (event) => {
  setSelectedValue(event.target.value);
};
  return (
    <div className="SearchSection">
      <button onClick={() => onSearch(selectedValue)}>Search</button>

      <select value={selectedValue} onChange={handleChange}>
        <option value="comp">COMP</option>
        <option value="stat">STAT</option>
        <option value="math">MATH</option>
        <option value="psyc">PSYC</option>
        <option value="busi">BUSI</option>
        <option value="sysc">SYSC</option>
        <option value="phil">PHIL</option>
        <option value="ecor">ECOR</option>
        <option value="chem">CHEM</option>
        <option value="biol">BIOL</option>
        
      </select>

    </div>
  );
}

export default SearchSection;

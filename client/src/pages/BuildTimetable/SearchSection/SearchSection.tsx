import "./SearchSection.style.scss";
import { useState } from 'react';




interface SearchSectionProps {
  onSearch: (program:string, crn:string) => void;
}
function SearchSection({ onSearch }: SearchSectionProps) {
  const [selectedValue, setSelectedValue] = useState<string>('');
  const [crnval, setCrnval] = useState<string>('');

const handleChange = (event) => {
  setSelectedValue(event.target.value);
};
const handleCrn = (event) => {
  setCrnval(event.target.value);
  console.log(event.target.value)
};
  return (
    <div className="SearchSection">
      <button onClick={() => { 
        console.log(`This is crnValue: ${crnval}`)
      onSearch(selectedValue, crnval)
      }}>Search</button>

      <input type="text" value={crnval} onChange={handleCrn}/>

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

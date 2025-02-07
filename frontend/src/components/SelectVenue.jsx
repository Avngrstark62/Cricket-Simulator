const SelectVenue = ({venue, handleChange}) => {

    return (
        <select value={venue} onChange={(e) => handleChange("venue", e.target.value)}>
            <option value="">Select Venue</option>
            <option value="Wankhede">Wankhede</option>
            <option value="MCG">MCG</option>
        </select>
    );
  };
  
  export default SelectVenue;
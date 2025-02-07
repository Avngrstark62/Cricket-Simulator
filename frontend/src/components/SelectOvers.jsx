const SelectOvers = ({overs, handleChange}) => {

    return (
        <select value={overs} onChange={(e) => handleChange("overs", e.target.value)}>
            <option value="">Select Overs</option>
            <option value="20">20</option>
            <option value="50">50</option>
        </select>
    );
  };
  
  export default SelectOvers;
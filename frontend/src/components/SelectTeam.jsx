const SelectTeam = ({team, handleChange, team_label}) => {

    return (
        <select value={team} onChange={(e) => handleChange(team_label, e.target.value)}>
            <option value="">Select Team</option>
            <option value="India">India</option>
            <option value="Australia">Australia</option>
            <option value="England">England</option>
            <option value="Pakistan">Pakistan</option>
        </select>
    );
  };
  
  export default SelectTeam;
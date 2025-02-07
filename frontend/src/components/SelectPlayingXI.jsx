import { useState, useEffect } from "react";

const SelectPlayingXI = ({ availablePlayers, setAvailablePlayers, handleChange, label }) => {

    const [selectedPlayers, setSelectedPlayers] = useState([]);

    useEffect(() => {
      handleChange(label, selectedPlayers)
      }, [selectedPlayers]);
    
    const handlePlayerSelect = (player) => {
      setAvailablePlayers((prev) => prev.filter((p) => p !== player));
      setSelectedPlayers((prev) => [...prev, { name: player, isCaptain: false, isWicketKeeper: false }]);
    };
  
    const handlePlayerRemove = (player) => {
      setSelectedPlayers((prev) => prev.filter((p) => p.name !== player.name));
      setAvailablePlayers((prev) => [...prev, player.name]);
    };
  
    const handleCheckboxChange = (index, key) => {
        setSelectedPlayers((prev) => prev.map((p, i) => ({ ...p, [key]: i === index })));
    };
  
    return (
      <div className="team-selection">
        <h3>Select Playing XI</h3>
        <div className="team-selection-container">
          <div className="players-list available-players">
            <h4>Available Players</h4>
            <ul>
              {availablePlayers.map((player, index) => (
                <li key={index} className="player-item">
                  {player}
                  <button className="add-btn" onClick={() => handlePlayerSelect(player)}>+</button>
                </li>
              ))}
            </ul>
          </div>
  
          <div className="players-list selected-players">
            <h4>Playing XI</h4>
            <ul>
              {selectedPlayers.map((player, index) => (
                <li key={index} className="player-item">
                  <span className="player-name">{player.name}</span>
                  <label className="checkbox-label">
                    <input type="checkbox" checked={player.isCaptain} onChange={() => handleCheckboxChange(index, "isCaptain")} />
                    Captain
                  </label>
                  <label className="checkbox-label">
                    <input type="checkbox" checked={player.isWicketKeeper} onChange={() => handleCheckboxChange(index, "isWicketKeeper")} />
                    Wicketkeeper
                  </label>
                  <button className="remove-btn" onClick={() => handlePlayerRemove(player)}>-</button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  };
  
  export default SelectPlayingXI;
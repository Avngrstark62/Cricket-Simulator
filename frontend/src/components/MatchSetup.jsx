import { useState } from "react";
import { motion } from "framer-motion";
import { createMatch } from "../api/api";
import { useNavigate } from "react-router-dom";

const MatchSetup = () => {
  const steps = ["Team A", "Team B", "Overs", "Venue", "Playing XI (A)", "Playing XI (B)"];
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    teamA: "",
    teamB: "",
    overs: "",
    venue: "",
    playingXI_A: Array(11).fill().map(() => ({ name: "", isCaptain: false, isWicketKeeper: false })),
    playingXI_B: Array(11).fill().map(() => ({ name: "", isCaptain: false, isWicketKeeper: false })),
  });
  const [loading, setLoading] = useState(false);

  const handleNext = () => {
    if (isStepValid()) {
      setStep(step + 1);
    }
  };

  const handlePrev = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePlayerChange = (team, index, key, value) => {
    const updatedTeam = [...formData[team]];
    if (key === "isCaptain" || key === "isWicketKeeper") {
      updatedTeam.forEach((player, i) => {
        if (i !== index) player[key] = false;
      });
    }
    updatedTeam[index][key] = value;
    handleChange(team, updatedTeam);
  };

  const isStepValid = () => {
    switch (step) {
      case 0:
        return formData.teamA !== "";
      case 1:
        return formData.teamB !== "" && formData.teamB !== formData.teamA;
      case 2:
        return formData.overs !== "";
      case 3:
        return formData.venue !== "";
      case 4:
        return formData.playingXI_A.every((player) => player.name.trim() !== "") &&
               formData.playingXI_A.some((player) => player.isCaptain) &&
               formData.playingXI_A.some((player) => player.isWicketKeeper);
      case 5:
        return formData.playingXI_B.every((player) => player.name.trim() !== "") &&
               formData.playingXI_B.some((player) => player.isCaptain) &&
               formData.playingXI_B.some((player) => player.isWicketKeeper);
      default:
        return false;
    }
  };

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!isStepValid()) return;
    setLoading(true);
    try {
      await createMatch(formData);
      alert("Match Created Successfully!");
      navigate("/quick_match/play")
      // Reset form or redirect user
    } catch (error) {
      console.log(error)
      alert("Error creating match");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="match-setup-container">
      <div className="progress-bar">
        <div className="progress" style={{ width: `${((step + 1) / steps.length) * 100}%` }}></div>
      </div>
      <motion.div key={step} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}>
        {step === 0 && (
          <select value={formData.teamA} onChange={(e) => handleChange("teamA", e.target.value)}>
            <option value="">Select Team A</option>
            <option value="India">India</option>
            <option value="Australia">Australia</option>
          </select>
        )}
        {step === 1 && (
          <select value={formData.teamB} onChange={(e) => handleChange("teamB", e.target.value)}>
            <option value="">Select Team B</option>
            <option value="England">England</option>
            <option value="Pakistan">Pakistan</option>
          </select>
        )}
        {step === 2 && (
          <select value={formData.overs} onChange={(e) => handleChange("overs", e.target.value)}>
            <option value="">Select Overs</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
        )}
        {step === 3 && (
          <select value={formData.venue} onChange={(e) => handleChange("venue", e.target.value)}>
            <option value="">Select Venue</option>
            <option value="Wankhede">Wankhede</option>
            <option value="MCG">MCG</option>
          </select>
        )}
        {step === 4 && (
          <div>
            {formData.playingXI_A.map((player, index) => (
              <div key={index} className="player-row">
                <input
                  type="text"
                  value={player.name}
                  placeholder={`Player ${index + 1}`}
                  onChange={(e) => handlePlayerChange("playingXI_A", index, "name", e.target.value)}
                />
                <label>
                  <input
                    type="checkbox"
                    checked={player.isCaptain}
                    onChange={() => handlePlayerChange("playingXI_A", index, "isCaptain", !player.isCaptain)}
                  />
                  Captain
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={player.isWicketKeeper}
                    onChange={() => handlePlayerChange("playingXI_A", index, "isWicketKeeper", !player.isWicketKeeper)}
                  />
                  Wicketkeeper
                </label>
              </div>
            ))}
          </div>
        )}
        {step === 5 && (
          <div>
            {formData.playingXI_B.map((player, index) => (
              <div key={index} className="player-row">
                <input
                  type="text"
                  value={player.name}
                  placeholder={`Player ${index + 1}`}
                  onChange={(e) => handlePlayerChange("playingXI_B", index, "name", e.target.value)}
                />
                <label>
                  <input
                    type="checkbox"
                    checked={player.isCaptain}
                    onChange={() => handlePlayerChange("playingXI_B", index, "isCaptain", !player.isCaptain)}
                  />
                  Captain
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={player.isWicketKeeper}
                    onChange={() => handlePlayerChange("playingXI_B", index, "isWicketKeeper", !player.isWicketKeeper)}
                  />
                  Wicketkeeper
                </label>
              </div>
            ))}
          </div>
        )}
      </motion.div>
      <div className="button-container">
        {step === 0 && <button className="cancel-btn">Cancel</button>}
        {step > 0 && <button onClick={handlePrev}>Back</button>}
        {step < steps.length - 1 ? (
          <button onClick={handleNext} disabled={!isStepValid()} className={!isStepValid() ? "disabled-btn" : ""}>
            Next
          </button>
        ) : (
          <button onClick={handleSubmit} disabled={loading} className={loading ? "disabled-btn" : ""}>
            {loading ? "Submitting..." : "Submit"}
          </button>
        )}
      </div>
    </div>
  );
};

export default MatchSetup;
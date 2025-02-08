import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { createMatch } from "../api/api";
import { useNavigate } from "react-router-dom";
import { fetchDefaultPlayingXI } from "../api/api";
import ProgressBar from "../components/ProgressBar";
import SelectTeam from "../components/SelectTeam";
import SelectOvers from "../components/SelectOvers";
import SelectVenue from "../components/SelectVenue";
import SelectPlayingXI from "../components/SelectPlayingXI";

const MatchSetup = () => {
  const steps = ["Team A", "Team B", "Overs", "Venue", "Playing XI (A)", "Playing XI (B)"];
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    teamA: "",
    teamB: "",
    overs: "",
    venue: "",
    playingXI_A: [],
    playingXI_B: [],
  });
  
  const [availablePlayers, setaAailablePlayers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (step === 4 && formData.teamA) {
      fetchPlayers(formData.teamA);
    } else if (step === 5 && formData.teamB) {
      fetchPlayers(formData.teamB);
    }
  }, [step, formData.teamA, formData.teamB]);

  const fetchPlayers = async (team) => {
    try {
      const response = await fetchDefaultPlayingXI({ team });
      setaAailablePlayers(response.data.playing_xi);
    } catch (error) {
      console.error("Error fetching players", error);
    }
  };

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
        return formData.playingXI_A.length === 11 && formData.playingXI_A.some(p => p.isCaptain) && formData.playingXI_A.some(p => p.isWicketKeeper);
      case 5:
        return formData.playingXI_B.length === 11 && formData.playingXI_B.some(p => p.isCaptain) && formData.playingXI_B.some(p => p.isWicketKeeper);
      default:
        return false;
    }
  };

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!isStepValid()) return;
    setLoading(true);
    try {
      const response = await createMatch(formData);
      alert("Match Created Successfully!");
      const id=response.data.match._id
      navigate(`/quick_match/play/${id}`);
    } catch (error) {
      console.log(error)
      alert("Error creating match");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="match-setup-container">
      <ProgressBar step={step} steps={steps}/>

      <motion.div key={step} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}>
        {step === 0 && (
          <SelectTeam team={formData.teamA} handleChange={handleChange} team_label={"teamA"}/>
        )}
        {step === 1 && (
          <SelectTeam team={formData.teamB} handleChange={handleChange} team_label={"teamB"}/>
        )}
        {step === 2 && (
          <SelectOvers overs={formData.overs} handleChange={handleChange}/>
        )}
        {step === 3 && (
          <SelectVenue venue={formData.venue} handleChange={handleChange}/>
        )}
        {step === 4 && (
          <SelectPlayingXI availablePlayers={availablePlayers} setAvailablePlayers={setaAailablePlayers} handleChange={handleChange} label={"playingXI_A"}/>
        )}
        {step === 5 && (
          <SelectPlayingXI availablePlayers={availablePlayers} setAvailablePlayers={setaAailablePlayers} handleChange={handleChange} label={"playingXI_B"}/>
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
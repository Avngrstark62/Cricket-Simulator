import { useEffect, useState } from "react";
import { addNewBatsman, fetchAvailableBatsmen, fetchAvailableBowlers, updateBowler } from "../api/api";

const StartNewInningForm = ({ show, onClose, id, setCount }) => {
    const [availableBatsmen, setAvailableBatsmen] = useState([]);
    const [availableBowlers, setAvailableBowlers] = useState([]);
    const [formData, setFormData] = useState({
        striker: "",
        nonStriker: "",
        bowler: ""
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const batsmenResponse = await fetchAvailableBatsmen(id);
                setAvailableBatsmen(batsmenResponse.data.availableBatsmen);
                const bowlersResponse = await fetchAvailableBowlers(id);
                setAvailableBowlers(bowlersResponse.data.availableBowlers);
            } catch (error) {
                console.error("Error fetching available players", error);
            }
        };

        fetchData();
    }, [id]);
    
    if (!show) return null;


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!formData.striker || !formData.nonStriker || !formData.bowler) {
                alert("Please select all players.");
                return;
            }
            await addNewBatsman(id, { batsman: formData.striker, end: "striker" });
            await addNewBatsman(id, { batsman: formData.nonStriker, end: "nonStriker" });
            await updateBowler(id, { bowler: formData.bowler });
            onClose();
        } catch (error) {
            console.error("Error updating players", error);
        }
        setCount((prev) => prev + 1);
    };

    return (
        <div className="popup-overlay">
            <div className="popup-container">
                <div className="popup-header">
                    <button className="close-popup-btn" onClick={onClose}>X</button>
                    <h2>Start New Inning</h2>
                </div>
                
                <form onSubmit={handleSubmit} className="popup-form">
                    <label>
                        Select Striker:
                        <select name="striker" value={formData.striker} onChange={handleChange} required>
                            <option value="" disabled>Select a striker</option>
                            {availableBatsmen.map((batsman, index) => (
                                <option key={index} value={batsman}>{batsman}</option>
                            ))}
                        </select>
                    </label>
                    
                    <label>
                        Select Non-Striker:
                        <select name="nonStriker" value={formData.nonStriker} onChange={handleChange} required>
                            <option value="" disabled>Select a non-striker</option>
                            {availableBatsmen.filter(batsman => batsman !== formData.striker).map((batsman, index) => (
                                <option key={index} value={batsman}>{batsman}</option>
                            ))}
                        </select>
                    </label>
                    
                    <label>
                        Select Bowler:
                        <select name="bowler" value={formData.bowler} onChange={handleChange} required>
                            <option value="" disabled>Select a bowler</option>
                            {availableBowlers.map((bowler, index) => (
                                <option key={index} value={bowler}>{bowler}</option>
                            ))}
                        </select>
                    </label>
                    
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default StartNewInningForm;
import { useEffect, useState } from "react";
import { fetchAvailableBowlers, updateBowler } from "../api/api";

const ChooseNewBowlerForm = ({ show, onClose, id, setCount }) => {
    const [availableBowlers, setAvailableBowlers] = useState([]);
    const [formData, setFormData] = useState({
        bowler: ""
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
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
            if (!formData.bowler) {
                alert("Please a bowler.");
                return;
            }
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

export default ChooseNewBowlerForm;
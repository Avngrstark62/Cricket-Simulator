import { useEffect, useState } from "react";
import { addNewBatsman, fetchAvailableBatsmen } from "../api/api";

const ChooseNewBatsman = ({ show, onClose, id, setCount, striker, nonStriker }) => {
    const [availableBatsmen, setAvailableBatsmen] = useState([]);
    const [formData, setFormData] = useState({
        batsman: "",
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const batsmenResponse = await fetchAvailableBatsmen(id);
                setAvailableBatsmen(batsmenResponse.data.availableBatsmen);
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
            if (!formData.batsman) {
                alert("Please a batsman.");
                return;
            }
            let end = null;
            if (!striker){
                end="striker"
            }
            else if (!nonStriker){
                end="nonStriker"
            }
            await addNewBatsman(id, { batsman: formData.batsman, end: end });
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
                        Select Batsman:
                        <select name="batsman" value={formData.batsman} onChange={handleChange} required>
                            <option value="" disabled>Select a batsman</option>
                            {availableBatsmen.map((batsman, index) => (
                                <option key={index} value={batsman}>{batsman}</option>
                            ))}
                        </select>
                    </label>
                    
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default ChooseNewBatsman;
import { useEffect, useState } from "react";
import { addNewBatsman, fetchAvailableBatsmen, fetchAvailableBowlers, updateBowler } from "../api/api";

const SelectBowler = ({id}) => {
    const [availableBowlers, setAvailableBowlers] = useState([]);
    const [selected, setSelected] = useState("");

    useEffect(() => {
            const FetchAvailableBowlers = async () => {
                try {
                    const response = await fetchAvailableBowlers(id);
                    setAvailableBowlers(response.data.availableBowlers);
                } catch (error) {
                    console.error("Error fetching availableBowlers", error);
                }
            };
    
            FetchAvailableBowlers();
        }, [id]);
    
    const handleSubmit = () => {
        const UpdateBowler = async () => {
                    try {
                        if (!selected) {
                            alert("Please select an option.");
                            return;
                        }
                        const formData = {
                            bowler: selected,
                        }
                        await updateBowler(id, formData);
                    } catch (error) {
                        console.error("Error fetching updating bowler", error);
                    }
                };
        UpdateBowler();
    }

    return (
        <div>
            <h3>Select Bowler</h3>

            <form onSubmit={handleSubmit}>
              <label>
                Choose an option:
                <select value={selected} onChange={(e) => setSelected(e.target.value)}>
                  <option value="" disabled>Select an option</option>
                  {availableBowlers.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                  ))}
                </select>
              </label>
              <button type="submit">Submit</button>
            </form>

        </div>
    );
};

export default SelectBowler;
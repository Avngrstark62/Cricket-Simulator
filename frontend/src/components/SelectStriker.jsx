import { useEffect, useState } from "react";
import { addNewBatsman, fetchAvailableBatsmen } from "../api/api";

const SelectStriker = ({id}) => {
    const [availableBatsmen, setAvailableBatsmen] = useState([]);
    const [selected, setSelected] = useState("");

    useEffect(() => {
            const FetchAvailableBatsmen = async () => {
                try {
                    const response = await fetchAvailableBatsmen(id);
                    setAvailableBatsmen(response.data.availableBatsmen);
                } catch (error) {
                    console.error("Error fetching availableBatsmen", error);
                }
            };
    
            FetchAvailableBatsmen();
        }, [id]);
    
    const handleSubmit = () => {
        const UpdateStriker = async () => {
            try {
                if (!selected) {
                    alert("Please select an option.");
                    return;
                }
                const formData = {
                    batsman: selected,
                    end: "striker"
                }
                await addNewBatsman(id, formData);
            } catch (error) {
                console.error("Error fetching updating stiker", error);
            }
        };
        UpdateStriker();
    }

    return (
        <div>
            <h3>Select Striker</h3>
            <form onSubmit={handleSubmit}>
              <label>
                Choose an option:
                <select value={selected} onChange={(e) => setSelected(e.target.value)}>
                  <option value="" disabled>Select an option</option>
                  {availableBatsmen.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                  ))}
                </select>
              </label>
              <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default SelectStriker;
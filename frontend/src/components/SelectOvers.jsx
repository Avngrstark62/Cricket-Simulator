import { useState, useEffect } from "react";

const SelectOvers = ({ overs, handleChange }) => {
  const [selectedOvers, setSelectedOvers] = useState(overs || "");
  const [customOvers, setCustomOvers] = useState(20); // Default custom overs value

  useEffect(() => {
    handleChange("overs", selectedOvers === "custom" ? customOvers.toString() : selectedOvers);
  }, [selectedOvers, customOvers]);

  return (
    <div>
      <select value={selectedOvers} onChange={(e) => setSelectedOvers(e.target.value)}>
        <option value="">Select Overs</option>
        <option value="20">20</option>
        <option value="50">50</option>
        <option value="custom">Custom</option>
      </select>

      {selectedOvers === "custom" && (
        <div>
          <input
            type="range"
            min="1"
            max="50"
            value={customOvers}
            onChange={(e) => setCustomOvers(parseInt(e.target.value))}
          />
          <span>{customOvers} Overs</span>
        </div>
      )}
    </div>
  );
};

export default SelectOvers;

// const SelectOvers = ({overs, handleChange}) => {

//     return (
//         <select value={overs} onChange={(e) => handleChange("overs", e.target.value)}>
//             <option value="">Select Overs</option>
//             <option value="20">20</option>
//             <option value="50">50</option>
//         </select>
//     );
//   };
  
//   export default SelectOvers;
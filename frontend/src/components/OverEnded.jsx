import { useEffect, useState } from "react";
import { fetchBowler } from "../api/api";
import ChooseNewBowlerForm from "./ChooseNewBowlerForm";

const OverEnded = ({ id, count, setCount }) => {
    const [bowler, setBowler] = useState(null);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
                  
                  const FetchBowler = async () => {
                          try {
                              const response = await fetchBowler(id);
                              setBowler(response.data.bowler);
                          } catch (error) {
                              console.error("Error fetching bowler", error);
                          }
                      };
          
          FetchBowler();
        }, [id, count]);
    return (
        <div>
            {!bowler && 
                <div className="scorecard-container">
                    {!showForm && (
                        <div>
                            <button onClick={() => setShowForm(true)} className="open-popup-button">Choose New Bowler</button>
                        </div>
                    )}
                    <ChooseNewBowlerForm show={showForm} onClose={() => setShowForm(false)} id={id} setCount={setCount}/>
                </div>
            }
        </div>
    );
};

export default OverEnded;
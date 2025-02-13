import { useEffect, useState } from "react";
import { fetchBowler, fetchInningNumber, fetchNonStriker, fetchStriker } from "../api/api";
import StartNewInningForm from './StartNewInningForm'

const InningJustStarted = ({ id, count, setCount }) => {
    const [inningNumber, setInningNumber] = useState(null);
    const [striker, setStriker] = useState(null);
    const [nonStriker, setNonStriker] = useState(null);
    const [bowler, setBowler] = useState(null);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
            const FetchInningNumber = async () => {
                try {
                    const response = await fetchInningNumber(id);
                    setInningNumber(response.data.inningNumber);
                } catch (error) {
                    console.error("Error fetching inning number", error);
                }
            };

            const FetchStriker = async () => {
                          try {
                              const response = await fetchStriker(id);
                              setStriker(response.data.striker);
                          } catch (error) {
                              console.error("Error fetching striker", error);
                          }
                      };
                  
                  const FetchNonStriker = async () => {
                          try {
                              const response = await fetchNonStriker(id);
                              setNonStriker(response.data.nonStriker);
                          } catch (error) {
                              console.error("Error fetching non striker", error);
                          }
                      };
                  
                  const FetchBowler = async () => {
                          try {
                              const response = await fetchBowler(id);
                              setBowler(response.data.bowler);
                          } catch (error) {
                              console.error("Error fetching bowler", error);
                          }
                      };
            
          FetchInningNumber();
          FetchStriker();
          FetchNonStriker();
          FetchBowler();
        }, [id, count]);
    return (
        <div>
            {(!striker || !nonStriker || !bowler) && 
                <div className="scorecard-container">
                    {!showForm && (
                        <div>
                            {inningNumber && 
                            <button onClick={() => setShowForm(true)} className="open-popup-button">
                                {inningNumber==1 ? "Start First Inning" : "Start Second Inning"}
                            </button>
                            }
                        </div>
                    )}
                    <StartNewInningForm show={showForm} onClose={() => setShowForm(false)} id={id} setCount={setCount}/>
                </div>
            }
        </div>
    );
};

export default InningJustStarted;
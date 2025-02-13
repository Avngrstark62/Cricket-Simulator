import { useEffect, useState } from "react";
import { fetchNonStriker, fetchStriker } from "../api/api";
import ChooseNewBatsman from "./ChooseNewBatsman";

const WicketFallen = ({ id, count, setCount }) => {
    const [striker, setStriker] = useState(null);
    const [nonStriker, setNonStriker] = useState(null);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {

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
          
          FetchStriker();
          FetchNonStriker();
        }, [id, count]);
    return (
        <div>
            {(!striker || !nonStriker) && 
                <div className="scorecard-container">
                    {!showForm && (
                        <div>
                            <button onClick={() => setShowForm(true)} className="open-popup-button">
                                Choose New Batsman
                            </button>
                        </div>
                    )}
                    <ChooseNewBatsman show={showForm} onClose={() => setShowForm(false)} id={id} setCount={setCount} striker={striker} nonStriker={nonStriker}/>
                </div>
            }
        </div>
    );
};

export default WicketFallen;
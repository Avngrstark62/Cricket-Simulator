import '../styles/main-screen.css'

import { useState, useEffect } from "react";
import { updateTossDetails, fetchTossDetails } from "../api/api";

const Toss = ({ id, teams, setIsTossDone }) => {
    const [electedTo, setElectedTo] = useState("");
    const [tossDetails, setTossDetails] = useState({
        tossWinner: null,
        electedTo: null
      });

    useEffect(() => {
            const FetchTossDetails = async () => {
                try {
                    const response = await fetchTossDetails(id);
                    setTossDetails(response.data.tossDetails);
                } catch (error) {
                    console.error("Error fetching toss details", error);
                }
            };
    
            FetchTossDetails();
        }, [id]);

    useEffect(() => {
            const UpdateTossDetails = async () => {
                try {
                    if (tossDetails.tossWinner || tossDetails.electedTo) {
                      const FormData = { tossDetails }
                      await updateTossDetails(id, FormData);
                    }
                } catch (error) {
                    console.error("Error updating toss details", error);
                }
            };
    
            if (tossDetails){
              UpdateTossDetails();
            }
        }, [id, tossDetails]);

    const handleTossCoin = () => {
        const randomNumber = Math.random();
        let tossWinner = randomNumber >= 0.5 ? "teamA" : "teamB";

        setTossDetails((prev) => ({
            ...prev,
            tossWinner: tossWinner
        }));
    };

    const handleTossDecision = (e) => {
        e.preventDefault();
        
        if (!electedTo) {
            alert("Please choose an option!");
            return;
        }

        setTossDetails((prev) => ({
            ...prev,
            electedTo: electedTo
        }));
    };

    const handleTossDone = () => {
        setIsTossDone(true);
    }

    return (
        <div className="main-screen">
            <h1 className="main-screen-header">{teams.teamA} vs {teams.teamB}</h1>
            <h2>Toss</h2>
            {tossDetails.tossWinner && tossDetails.electedTo
            ?
            <div>
                <p>{tossDetails.tossWinner=="teamA" ? teams.teamA : teams.teamB} won the Toss and decided to {tossDetails.electedTo}</p>
                <button onClick={handleTossDone}>Toss is done start the match</button>
            </div>
            :
            (tossDetails.tossWinner ? (
                <div>
                    <p>{tossDetails.tossWinner=="teamA" ? teams.teamA : teams.teamB} won the Toss</p>

                    <form onSubmit={handleTossDecision}>
                        <label>
                            <input
                                type="radio"
                                name="decision"
                                value="bat"
                                checked={electedTo === "bat"}
                                onChange={(e) => setElectedTo(e.target.value)}
                            />
                            Bat
                        </label>
                        <br />
                        <label>
                            <input
                                type="radio"
                                name="decision"
                                value="field"
                                checked={electedTo === "field"}
                                onChange={(e) => setElectedTo(e.target.value)}
                            />
                            Field
                        </label>
                        <br />
                        <button type="submit">Submit</button>
                    </form>
                </div>
            ) : (
                <div>
                    <button onClick={handleTossCoin}>Toss the Coin</button>
                </div>
            ))
            }
        </div>
    );
};

export default Toss;
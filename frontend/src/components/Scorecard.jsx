import { useEffect, useState } from "react";
import { fetchScorecard } from "../api/api";

const Scorecard = ({show, onClose, id, inningNumber}) => {
    if (!show) return null;

    const [scorecard, setScorecard] = useState({});
    const [scorecardType, setScorecardType] = useState("batting");

    useEffect(() => {
            const FetchScorecard = async () => {
              try {
                const FormData = {
                    inningNumber
                }
                console.log(FormData)
                const response = await fetchScorecard(id, FormData);
                setScorecard(response.data.scorecard);
              } catch (error) {
                  console.error("Error fetching scorecard", error);
              }
          };
            
          FetchScorecard();
        }, [id, inningNumber]);

    return (
        <div className="popup-overlay">
            <div className="popup-container">
                <div className="popup-header">
                    <button className="close-popup-btn" onClick={onClose}>X</button>
                    <div className="scorecard-switch">
                        <button onClick={() => setScorecardType("batting")}>Batting</button>
                        <button onClick={() => setScorecardType("bowling")}>Bowling</button>
                    </div>
                </div>
        
                <h2 className="popup-title">Scorecard</h2>
        
                {scorecardType === "batting" && (
                    <div className="scorecard-section">
                        <h2>Batting Scorecard</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Player Name</th>
                                    <th>Runs</th>
                                    <th>Balls</th>
                                    <th>Fours</th>
                                    <th>Sixes</th>
                                    <th>Strike Rate</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {scorecard.battingScorecard?.map((player) => (
                                    <tr key={player.name}>
                                        <td>{player.name}</td>
                                        <td>{player.runs}</td>
                                        <td>{player.balls}</td>
                                        <td>{player.fours}</td>
                                        <td>{player.sixes}</td>
                                        <td>{player.strikeRate}</td>
                                        <td>{player.howOut ? `${player.howOut} ${player.bowler}` : 'NotOut'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
        
                {scorecardType === "bowling" && (
                    <div className="scorecard-section">
                        <h2>Bowling Scorecard</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Player Name</th>
                                    <th>Maidens</th>
                                    <th>Balls</th>
                                    <th>Runs</th>
                                    <th>Wickets</th>
                                    <th>Economy</th>
                                </tr>
                            </thead>
                            <tbody>
                                {scorecard.bowlingScorecard?.map((player) => (
                                    <tr key={player.name}>
                                        <td>{player.name}</td>
                                        <td>{player.maidens}</td>
                                        <td>{player.balls}</td>
                                        <td>{player.runsConceded}</td>
                                        <td>{player.wickets}</td>
                                        <td>{player.economy}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Scorecard;
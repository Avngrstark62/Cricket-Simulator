import { useState, useEffect } from "react";
import { fetchBattingTeam, fetchBowler, fetchBowlerStats, fetchBowlingTeam, fetchInningNumber, fetchNonStriker, fetchNonStrikerStats, fetchScore, fetchStriker, fetchStrikerStats, fetchTarget, fetchVenue } from "../api/api";

const Scoreboard = ({id, count}) => {
    const [score, setScore] = useState(null);
    const [inningNumber, setInningNumber] = useState(1);
    const [striker, setStriker] = useState(null);
    const [nonStriker, setNonStriker] = useState(null);
    const [bowler, setBowler] = useState(null);
    const [battingTeam, setBattingTeam] = useState(null);
    const [bowlingTeam, setBowlingTeam] = useState(null);
    const [strikerStats, setStrikerStats] = useState(null);
    const [nonStrikerStats, setNonStrikerStats] = useState(null);
    const [bowlerStats, setBowlerStats] = useState(null);
    const [venue, setVenue] = useState(null);
    const [target, setTarget] = useState(null);

    useEffect(() => {
        const FetchInningNumber = async () => {
            try {
                const response = await fetchInningNumber(id);
                setInningNumber(response.data.inningNumber);
            } catch (error) {
                console.error("Error fetching inning number", error);
            }
        };

        const FetchScore = async () => {
          try {
            const response = await fetchScore(id);
            setScore(response.data.scoreboard);
          } catch (error) {
              console.error("Error fetching scoreboard", error);
          }
      };

      const FetchBattingTeam = async () => {
                  try {
                      const response = await fetchBattingTeam(id);
                      setBattingTeam(response.data.battingTeam);
                  } catch (error) {
                      console.error("Error fetching batting team", error);
                  }
              };
    
      const FetchBowlingTeam = async () => {
                    try {
                        const response = await fetchBowlingTeam(id);
                        setBowlingTeam(response.data.bowlingTeam);
                    } catch (error) {
                        console.error("Error fetching bowling team", error);
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
      

      const FetchStrikerStats = async () => {
            try {
                const response = await fetchStrikerStats(id);
                setStrikerStats(response.data.stats);
            } catch (error) {
                console.error("Error fetching striker stats", error);
            }
        };

        const FetchNonStrikerStats = async () => {
            try {
                const response = await fetchNonStrikerStats(id);
                setNonStrikerStats(response.data.stats);
            } catch (error) {
                console.error("Error fetching nonStriker stats", error);
            }
        };

        const FetchBowlerStats = async () => {
            try {
                const response = await fetchBowlerStats(id);
                setBowlerStats(response.data.stats);
            } catch (error) {
                console.error("Error fetching bowler stats", error);
            }
        };

        const FetchVenue = async () => {
            try {
                const response = await fetchVenue(id);
                setVenue(response.data.venue);
            } catch (error) {
                console.error("Error fetching venue", error);
            }
        };

        const FetchTarget = async () => {
            try {
                const response = await fetchTarget(id);
                setTarget(response.data.target);
            } catch (error) {
                console.error("Error fetching target", error);
            }
        };
        
      FetchInningNumber();
      FetchScore();
      FetchBattingTeam();
      FetchBowlingTeam();
      FetchStriker();
      FetchNonStriker();
      FetchBowler();
      FetchStrikerStats();
      FetchNonStrikerStats();
      FetchBowlerStats();
      FetchVenue();
      FetchTarget();
    }, [id, count]);

    return (
        <div className="scoreboard">
            <div className="scoreboard-item batting-team">
                <p className="team-name">{battingTeam}</p>
            </div>

            <div className="scoreboard-item middle-item">
                <div className="batting-data">
                    <p>
                        <span>{striker}*</span>
                        <span>{strikerStats && strikerStats.runs}/{strikerStats && strikerStats.balls}</span>
                    </p>
                    <p>
                        <span>{nonStriker}</span>
                        <span>{nonStrikerStats && nonStrikerStats.runs}/{nonStrikerStats && nonStrikerStats.balls}</span>
                    </p>
                </div>
    
                <div className="score-data">
                    <div className="score-top">
                        <div className="score-top-left">
                            <p className="score-top-left-p">
                                <span className="bowling-team-text">{bowlingTeam} v</span>
                                <span className="batting-team-text"> {battingTeam}</span>
                                {score && <span className="runs-wickets-text"> {score.runs}-{score.wickets}</span>}
                            </p>
                        </div>

                        <div className="score-top-right">
                            {score && <p className="overs">{parseInt(score.balls/6)}{score.balls%6!=0 && `.${score.balls%6}`}</p>}
                            
                        </div>
                    </div>
                    <div className="score-bottom">
                        <p>{inningNumber==1?`Live from ${venue}`:`Target ${target}`}</p>
                    </div>
                </div>
    
                <div className="bowling-data">
                    <p>
                        <span>{bowler}</span>
                        <span>{bowlerStats && bowlerStats.wickets}-{bowlerStats && bowlerStats.runsConceded}/{bowlerStats && bowlerStats.balls}</span>
                    </p>
                    <p>This Over</p>
                </div>
            </div>

            <div className="scoreboard-item bowling-team">
                <p className="team-name">{bowlingTeam}</p>
            </div>
        </div>
    );
};

export default Scoreboard;
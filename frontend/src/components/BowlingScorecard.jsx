import { useEffect, useState } from "react";
import { fetchBowlingScorecard } from "../api/api";

const BowlingScorecard = ({id, bowlingTeam, count}) => {
    const [bowlingScorecard, setBowlingScorecard] = useState(null);

    useEffect(() => {
        const FetchBowlingScorecard = async () => {
          try {
              const response = await fetchBowlingScorecard(id);
            setBowlingScorecard(response.data.bowlingScorecard);
          } catch (error) {
              console.error("Error fetching bowling scorecard", error);
          }
      };
        
      FetchBowlingScorecard();
    }, [id, count]);
    
    return (
        <div>
            <h2>Batting Scorecard - {bowlingTeam}</h2>
            <table border="1">
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
                    {bowlingScorecard && bowlingScorecard.map((player) => (
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
    );
};

export default BowlingScorecard;
import { useEffect, useState } from "react";
import { fetchBattingScorecard } from "../api/api";

const BattingScorecard = ({id, battingTeam, count}) => {
    const [battingScorecard, setBattingScorecard] = useState(null);

    useEffect(() => {
            const FetchBattingScorecard = async () => {
              try {
                const response = await fetchBattingScorecard(id);
                setBattingScorecard(response.data.battingScorecard);
              } catch (error) {
                  console.error("Error fetching batting scorecard", error);
              }
          };
            
          FetchBattingScorecard();
        }, [id, count]);

    return (
        <div>
            <h2>Batting Scorecard - {battingTeam}</h2>
            <table border="1">
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
                    {battingScorecard && battingScorecard.map((player) => (
                        <tr key={player.name}>
                            <td>{player.name}</td>
                            <td>{player.runs}</td>
                            <td>{player.balls}</td>
                            <td>{player.fours}</td>
                            <td>{player.sixes}</td>
                            <td>{player.strikeRate}</td>
                            <td>{player.howOut ? player.howOut + ' ' + player.bowler : 'NotOut'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BattingScorecard;
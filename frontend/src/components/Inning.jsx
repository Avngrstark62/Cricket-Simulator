import { useState, useEffect } from "react";
import { fetchBattingTeam, fetchBowlingTeam } from "../api/api";

const Inning = ({id, inningNumber, setInningNumber}) => {
    const [battingTeam, setBattingTeam] = useState(null);
    const [bowlingTeam, setBowlingTeam] = useState(null);

    useEffect(() => {
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

        FetchBattingTeam();
        FetchBowlingTeam();
    }, [id]);

    return (
        <div>
            <div>Inning {inningNumber}</div>
            <div>Batting Team: {battingTeam}</div>
            <div>Bowling Team: {bowlingTeam}</div>
        </div>
    );
};

export default Inning;
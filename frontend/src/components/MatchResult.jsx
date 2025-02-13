import { useEffect, useState } from "react";
import { fetchWinnerName } from "../api/api";

const MatchResult = ({ id }) => {
    const [winnerName, setWinnerName] = useState(null);

    useEffect(() => {
        const FetchWinnerName = async () => {
            try {
                const response = await fetchWinnerName(id);
                setWinnerName(response.data.winnerName);
            } catch (error) {
                console.error("Error fetching winnerName", error);
            }
        };

        FetchWinnerName();
    }, [id]);

    return (
        <div className="match-result-container">
            <div className={`result-box ${winnerName ? "winner" : "no-result"}`}>
                <p>
                    {winnerName ? `${winnerName} won the match! 🎉` : `No result`}
                </p>
            </div>
        </div>
    );
};

export default MatchResult;
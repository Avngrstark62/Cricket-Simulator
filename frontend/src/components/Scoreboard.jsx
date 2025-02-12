import { useState, useEffect } from "react";
import { fetchScoreboard } from "../api/api";

const Scoreboard = ({id, count}) => {
    const [scoreboard, setScoreboard] = useState(null);

    useEffect(() => {
        const FetchScoreBoard = async () => {
          try {
            const response = await fetchScoreboard(id);
            // const response = {
            //     runs: 103,
            //     wickets: 4
            // }
            setScoreboard(response.data.scoreboard);
            // setScoreboard(response)
          } catch (error) {
              console.error("Error fetching scoreboard", error);
          }
      };
        
      FetchScoreBoard();
    }, [id, count]);

    return (
        <div>
            <h2>Scoreboard</h2>
            {scoreboard && JSON.stringify(scoreboard)}
        </div>
    );
};

export default Scoreboard;
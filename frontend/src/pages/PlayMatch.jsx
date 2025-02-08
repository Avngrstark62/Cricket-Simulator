import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchInningNumber, fetchIsTossDone, fetchTeams } from "../api/api";
import Toss from "../components/Toss";
import Inning from "../components/Inning";

const PlayMatch = () => {
    const { id } = useParams();
    const [isTossDone, setIsTossDone] = useState(false);
    const [teams, setTeams] = useState({
      teamA: "",
      teamB: ""
    });
    const [inningNumber, setInningNumber] = useState(1);

    useEffect(() => {
        const FetchTeams = async () => {
          try {
              const response = await fetchTeams(id);
              setTeams(response.data.teams);
          } catch (error) {
              console.error("Error fetching teams", error);
          }
      };

        const FetchIsTossDone = async () => {
            try {
                const response = await fetchIsTossDone(id);
                setIsTossDone(response.data.isTossDone);
            } catch (error) {
                console.error("Error fetching isTossDone", error);
            }
        };

        const FetchInningNumber = async () => {
            try {
                const response = await fetchInningNumber(id);
                setInningNumber(response.data.inningNumber);
            } catch (error) {
                console.error("Error fetching inning number", error);
            }
        };
        
        FetchTeams();
        FetchIsTossDone();
        FetchInningNumber();
    }, [id]);

    return (
        <div>
            <h1>Play Match - {teams.teamA} vs {teams.teamB}</h1>
            {isTossDone
            ? <Inning id={id} inningNumber={inningNumber} setInningNumber={setInningNumber}/>
            : <Toss id={id} teams={teams} setIsTossDone={setIsTossDone}/>}
        </div>
    );
};

export default PlayMatch
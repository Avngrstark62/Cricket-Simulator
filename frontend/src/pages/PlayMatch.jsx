import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchIsTossDone, fetchTeams } from "../api/api";
import Toss from "../components/Toss";
import Inning from "../components/Inning";

const PlayMatch = () => {
    const { id } = useParams();
    const [isTossDone, setIsTossDone] = useState(false);
    const [teams, setTeams] = useState({
      teamA: "",
      teamB: ""
    });

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
        
        FetchTeams();
        FetchIsTossDone();
    }, [id]);

    return (
        <div>
            <h1>Play Match - {teams.teamA} vs {teams.teamB}</h1>

            {isTossDone
            ? <Inning id={id}/>
            : <Toss id={id} teams={teams} setIsTossDone={setIsTossDone}/>}
        </div>
    );
};

export default PlayMatch
import { useState, useEffect } from "react";
import { fetchBattingTeam, fetchBowler, fetchBowlingTeam, fetchInningNumber, fetchMatchStatus, fetchNonStriker, fetchStriker, throwDelivery } from "../api/api";
import BattingScorecard from "./BattingScorecard"
import BowlingScorecard from "./BowlingScorecard"
import SelectStriker from "./SelectStriker";
import SelectNonStriker from "./SelectNonStriker";
import SelectBowler from "./SelectBowler";
import Scoreboard from "./Scoreboard";

const Inning = ({id}) => {
    const [matchStatus, setMatchStatus] = useState(null);
    const [inningNumber, setInningNumber] = useState(1);
    const [battingTeam, setBattingTeam] = useState(null);
    const [bowlingTeam, setBowlingTeam] = useState(null);
    const [count, setCount] = useState(0);
    const [striker, setStriker] = useState(null);
    const [nonStriker, setNonStriker] = useState(null);
    const [bowler, setBowler] = useState(null);
    const [thisDelivery, setThisDelivery] = useState(null);

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

    useEffect(() => {
        const FetchMatchStatus = async () => {
            try {
                const response = await fetchMatchStatus(id);
                setMatchStatus(response.data.matchStatus);
            } catch (error) {
                console.error("Error fetching match status", error);
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

        FetchMatchStatus();
        FetchInningNumber();
        FetchBattingTeam();
        FetchBowlingTeam();
        FetchStriker();
        FetchNonStriker();
        FetchBowler();
    }, [id, count]);

    const handleThroughBall = async () => {

        const ThrowDelivery = async () => {
            try {
                const response = await throwDelivery(id);
                setThisDelivery(response.data.delivery);
            } catch (error) {
                console.error("Error throwing delivery", error);
            }
        };
        await ThrowDelivery();
        setCount((prev) => prev + 1);
      };

    return (
        <div>
            {matchStatus=="unfinished" && 
            (
                <div>
                    <div>Inning {inningNumber} - {battingTeam}</div>
                <p>Striker: {striker}</p>
                <p>Non Striker: {nonStriker}</p>
                <p>Bowler: {bowler}</p>
                <div>
                    {thisDelivery && JSON.stringify(thisDelivery)}
                </div>
                {!bowler ? (
                    <SelectBowler id={id} />
                ) : !striker ? (
                    <SelectStriker id={id} />
                ) : !nonStriker ? (
                    <SelectNonStriker id={id} />
                ) : (
                    <button onClick={handleThroughBall}>Through Ball</button>
                )}
                <Scoreboard id={id} count={count}/>
                <BattingScorecard id={id} battingTeam={battingTeam} count={count}/>
                <BowlingScorecard id={id} bowlingTeam={bowlingTeam} count={count}/>
                </div>
            )
        }

        {matchStatus=="finished" && (
            <h1>Match Finished</h1>
        )}
        </div>
    );
};

export default Inning;
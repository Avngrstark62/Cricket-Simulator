import '../styles/main-screen.css'

import { useState, useEffect } from "react";
import { fetchBattingTeam, fetchBowler, fetchBowlingTeam, fetchInningNumber, fetchMatchStatus, fetchNonStriker, fetchStriker, throwDelivery } from "../api/api";
import SelectStriker from "./SelectStriker";
import SelectNonStriker from "./SelectNonStriker";
import SelectBowler from "./SelectBowler";
import Scoreboard from "./Scoreboard";
import Scorecard from "./Scorecard";
import PostMatch from "./PostMatch";

const Inning = ({id, teams}) => {
    const [showScorecard, setShowScorecard] = useState(null);

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
    
    if (matchStatus=="unfinished"){
        return (
            <div className="main-screen">

                <div className="playground-container">
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
                </div>

                <div className="actions-container">
                    <h3>Show Scorecard</h3>
                    {!showScorecard && <button onClick={() => setShowScorecard(1)}>Inning 1</button>}
                    {!showScorecard && <button onClick={() => setShowScorecard(2)}>Inning 2</button>}
                    <Scorecard show={showScorecard} onClose={() => setShowScorecard(null)} id={id} inningNumber={showScorecard} />
                </div>
                
                <div className="scoreboard-container">
                    <h1>{teams.teamA} vs {teams.teamB}</h1>
                    <div>Inning {inningNumber} - {battingTeam}</div>
                    <p>Striker: {striker}</p>
                    <p>Non Striker: {nonStriker}</p>
                    <p>Bowler: {bowler}</p>
                    <Scoreboard id={id} count={count}/>
                </div>

            </div>
        )
    }
    else if(matchStatus=="finished"){
        return (<PostMatch/>)
    }
    else{
        return (<p>Loading Match Status...</p>)
    }

    // return (
    //     <div className="main-screen">
    //         <h1 className="main-screen-header">{teams.teamA} vs {teams.teamB}</h1>

    //         {matchStatus=="unfinished" && 
    //         (
    //             <div>
    //                 <div>Inning {inningNumber} - {battingTeam}</div>
    //                 <p>Striker: {striker}</p>
    //                 <p>Non Striker: {nonStriker}</p>
    //                 <p>Bowler: {bowler}</p>
    //                 <div>
    //                     {thisDelivery && JSON.stringify(thisDelivery)}
    //                 </div>
    //                 {!bowler ? (
    //                     <SelectBowler id={id} />
    //                 ) : !striker ? (
    //                     <SelectStriker id={id} />
    //                 ) : !nonStriker ? (
    //                     <SelectNonStriker id={id} />
    //                 ) : (
    //                     <button onClick={handleThroughBall}>Through Ball</button>
    //                 )}
    //                 <Scoreboard id={id} count={count}/>
    
    //                 <div>
    //                     <h3>Show Scorecard</h3>
    //                     {!showScorecard && <button onClick={() => setShowScorecard(1)}>Inning 1</button>}
    //                     {!showScorecard && <button onClick={() => setShowScorecard(2)}>Inning 2</button>}
    //                     <Scorecard show={showScorecard} onClose={() => setShowScorecard(null)} id={id} inningNumber={showScorecard} />
    //                 </div>
    //             </div>
    //         )
    //     }

    //     {matchStatus=="finished" && (
    //         <PostMatch/>
    //     )}

    //     {matchStatus==null && (
    //         <p>Loading Match Status...</p>
    //     )}
    //     </div>
    // );
};

export default Inning;
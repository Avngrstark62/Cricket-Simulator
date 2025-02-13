import '../styles/main-screen.css'
import '../styles/scoreboard.css'
import '../styles/scorecard.css'
import '../styles/delivery-display.css'
import '../styles/playground-actions.css'
import '../styles/popup.css'
import '../styles/popup-form.css'
import '../styles/match-result.css'

import { useState, useEffect } from "react";
import { fetchBowler, fetchMatchStatus, fetchNonStriker, fetchScore, fetchStriker, throwDelivery } from "../api/api";
import DeliveryDisplay from './DeliveryDisplay'
import Scoreboard from "./Scoreboard";
import Scorecard from "./Scorecard";
import InningJustStarted from "./InningJustStarted"
import WicketFallen from './WicketFallen'
import OverEnded from './OverEnded'
import MatchResult from './MatchResult'

const Inning = ({id}) => {
    const [showScorecard, setShowScorecard] = useState(null);

    const [matchStatus, setMatchStatus] = useState(null);
    const [count, setCount] = useState(0);
    const [striker, setStriker] = useState(null);
    const [nonStriker, setNonStriker] = useState(null);
    const [bowler, setBowler] = useState(null);
    const [thisDelivery, setThisDelivery] = useState(null);
    const [showThrowDeliveryButton, setShowThrowDeliveryButton] = useState(true);
    const [wicketFallen, setWicketFallen] = useState(false);
    const [overEnded, setoverEnded] = useState(false);
    const [inningJustStarted, setInningJustStarted] = useState(false);

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

        FetchMatchStatus();
        FetchStriker();
        FetchNonStriker();
        FetchBowler();
    }, [id, count]);

    const handleThroughBall = async () => {
        setShowThrowDeliveryButton(false);

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
        setShowThrowDeliveryButton(true);
      };

      useEffect(()=>{
              const SetWicketFallen_OverEnded_InningJustStarted = async () => {
                  try {
                    const response = await fetchScore(id);
                    const runs = response.data.scoreboard.runs
                    const balls = response.data.scoreboard.balls
                    
                    if (runs==0 && balls==0){
                        setInningJustStarted(true);
                    }
                    else{
                        setInningJustStarted(false);
                    }

                    if (runs==0 && balls==0){
                        setWicketFallen(false);
                      }
                      else if(!striker || !nonStriker){
                        setWicketFallen(true);
                      }
                      else{
                        setWicketFallen(false);
                      }
        
                      if (runs==0 && balls==0){
                        setoverEnded(false);
                      }
                      else if(!bowler){
                        setoverEnded(true);
                      }
                      else{
                        setoverEnded(false);
                      }
                } catch (error) {
                    console.error("Error fetching inningJustStarted", error);
                }
            };

            SetWicketFallen_OverEnded_InningJustStarted();
            },[id, striker, nonStriker, bowler, count])
    
    if (matchStatus=="unfinished"){
        return (
            <div className="main-screen">

                <div className="scorecard-container">
                    {!showScorecard && (
                        <div>
                            <button onClick={() => setShowScorecard(1)} className="open-popup-button">Scorecard Inning 1</button>
                            <button onClick={() => setShowScorecard(2)} className="open-popup-button">Scorecard Inning 2</button>
                        </div>
                    )}
                    <Scorecard show={showScorecard} onClose={() => setShowScorecard(null)} id={id} inningNumber={showScorecard} />
                </div>

                <div className="delivery-display">
                    <DeliveryDisplay thisDelivery={thisDelivery}/>
                </div>

                <div className="additional-display">
                    {inningJustStarted ? <InningJustStarted id={id} count={count} setCount={setCount}/>
                    :wicketFallen ? <WicketFallen id={id} count={count} setCount={setCount}/>
                    : overEnded ? <OverEnded id={id} count={count} setCount={setCount}/>
                    :null}
                </div>
                
                <div className="playground-actions-container">
                    {striker && nonStriker && bowler && showThrowDeliveryButton &&
                    (<div>
                        <button onClick={handleThroughBall}>Throw Ball</button>
                    </div>)}
                </div>
                
                <div className="scoreboard-container">
                    <Scoreboard id={id} count={count}/>
                </div>

            </div>
        )
    }
    else if(matchStatus=="finished"){
        return (
            <div className="main-screen">

                <div className="scorecard-container">
                    {!showScorecard && (
                        <div>
                            <button onClick={() => setShowScorecard(1)} className="open-popup-button">Scorecard Inning 1</button>
                            <button onClick={() => setShowScorecard(2)} className="open-popup-button">Scorecard Inning 2</button>
                        </div>
                    )}
                    <Scorecard show={showScorecard} onClose={() => setShowScorecard(null)} id={id} inningNumber={showScorecard} />
                </div>

                <div className="delivery-display">
                    <DeliveryDisplay thisDelivery={thisDelivery}/>
                </div>
                
                <div className='match-result'>
                    <MatchResult id={id}/>
                </div>
                
                {/* <div className="scoreboard-container">
                    <Scoreboard id={id} count={count}/>
                </div> */}


            </div>
        )
    }
    else{
        return (<p>Loading Match Status...</p>)
    }
};

export default Inning;
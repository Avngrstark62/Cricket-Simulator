import { Link } from "react-router-dom";

const QuickMatchPage = () => {
    return (
        <div>
            <h1>Quick Match</h1>
            {/* <div>
                <Link to="/quick_match/start_new" className='start-new-match-link'>
                    Start New Match
                </Link>
            </div>

            <div>
                <h2>Continue Unfinished Match</h2>
            </div>

            <div>
                <h2>Finished Matches</h2>
            </div> */}
        </div>
    );
};

export default QuickMatchPage;


// 1. Start New Match(fill details)
// 2. Continue Saved Match
// 3. Finished Matches(view scorecard)
// 4. Play a Match(via 1 or 2)(save match in between for 2, save match at the end for 3)
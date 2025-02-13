import { Link } from "react-router-dom";
import '../styles/quick-match-page.css'

const QuickMatchPage = () => {
    return (
        <div className="quick-match-container">
            <h1 className="quick-match-title">Quick Match</h1>
            <div className="link-container">
                <Link to="/quick_match/match_setup" className="start-new-match-link" target="_blank" rel="noopener noreferrer">
                    Start New Match
                </Link>
            </div>
        </div>
    );
};

export default QuickMatchPage;


// 1. Start New Match(fill details)
// 2. Continue Saved Match
// 3. Finished Matches(view scorecard)
// 4. Play a Match(via 1 or 2)(save match in between for 2, save match at the end for 3)
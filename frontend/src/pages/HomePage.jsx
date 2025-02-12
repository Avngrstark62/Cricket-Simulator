const Homepage = () => {
    return (
        <div>
            <h1>Welcome to Homepage</h1>
        </div>
    );
};

export default Homepage;

// import React, { useState } from "react";

// const Modal = ({ show, onClose }) => {
//     if (!show) return null; // Hide modal if `show` is false

//     return (
//         <div className="modal-overlay" onClick={onClose}>
//             <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//                 <h2>Notification</h2>
//                 <p>This modal appears at the top!</p>
//                 <button onClick={onClose}>Close</button>
//             </div>
//         </div>
//     );
// };

// const Homepage = () => {
//     const [showModal, setShowModal] = useState(false);

//     return (
//         <div>
//             <h1>Welcome to Homepage</h1>
//             <button onClick={() => setShowModal(true)}>Show Top Modal</button>
//             <Modal show={showModal} onClose={() => setShowModal(false)} />
//         </div>
//     );
// };

// export default Homepage;
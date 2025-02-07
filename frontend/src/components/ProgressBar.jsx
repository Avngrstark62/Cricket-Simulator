const ProgressBar = ({step, steps}) => {

  return (
    <div className="progress-bar">
        <div className="progress" style={{ width: `${((step + 1) / steps.length) * 100}%` }}></div>
    </div>
  );
};

export default ProgressBar;
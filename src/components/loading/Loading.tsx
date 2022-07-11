import './loading.scss';

const Loading = () => {
  return (
    <div className="loading">
      <svg className="loading-circle">
        <circle cx="50%" cy="50%" r="25"></circle>
      </svg>
    </div>
  );
};

export default Loading;

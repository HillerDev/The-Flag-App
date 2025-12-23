import "./SkeletonCard.css"

const SkeletonCard = () => {
    return (
        <div className="card skeleton">
            <div className="skeleton-flag" />
            <div className="skeleton-title" />
            <div className="skeleton-text" />
            <div className="skeleton-text" />
            <div className="skeleton-text" />
        </div>
    );
};

export default SkeletonCard;
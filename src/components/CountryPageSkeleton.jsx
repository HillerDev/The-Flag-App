import "./CountryPageSkeleton.css";

const CountryPageSkeleton = () => {
    return (
        <div className="country-container skeleton">
            <div className="flag skeleton-flag" />
            <div className="country-info">
                <h2 className="skeleton-title" />
                <div className="info-columns">
                    <div className="left-column">
                        <div className="skeleton-text" />
                        <div className="skeleton-text" />
                        <div className="skeleton-text" />
                        <div className="skeleton-text" />
                    </div>
                    <div className="right-column">
                        <div className="skeleton-text" />
                        <div className="skeleton-text" />
                        <div className="skeleton-text" />
                    </div>
                </div>
                <div className="border-countries">
                    <div className="skeleton-pill" />
                    <div className="skeleton-pill" />
                    <div className="skeleton-pill" />
                </div>
            </div>
            
        </div>
    );
};

export default CountryPageSkeleton;
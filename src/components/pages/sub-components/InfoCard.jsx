
// Reusable Info Card Component
const InfoCard = ({ children, className = "" }) => (
    <section className={`bg-white border border-purpleDarkScale-300 rounded-xl shadow ${className}`}>
        {children}
    </section>
);

export default InfoCard;
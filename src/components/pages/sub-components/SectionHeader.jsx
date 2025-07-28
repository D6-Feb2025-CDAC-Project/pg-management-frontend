// Reusable Section Header Component
const SectionHeader = ({ title, bgColor = "bg-purpleDarkScale-200" }) => (
    <h2 className={`${bgColor} text-lg font-semibold px-6 py-3 border-b rounded-t-xl border-purpleDarkScale-300 text-purpleDarkScale-600`}>
        {title}
    </h2>
);

export default SectionHeader;
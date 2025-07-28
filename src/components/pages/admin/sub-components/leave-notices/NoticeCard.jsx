import InfoCard from "../../../sub-components/InfoCard";
import SectionHeader from "../../../sub-components/SectionHeader";
import ActionForm from "./ActionForm";
import NoticeControls from "./NoticeControls";
import NoticeDetails from "./NoticeDetails";

// Main Notice Card Component (similar to ComplaintCard)
const NoticeCard = ({
    notice,
    selectedNotice,
    reviewNotes,
    setReviewNotes,
    onStatusChange,
    onAddNotes,
    onNotesSubmit,
    onNotesCancel,
    onSettleDeposit
}) => (
    <InfoCard>
        <SectionHeader title={`Leave Notice - ${notice.referenceId}`} />
        <div className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                <NoticeDetails notice={notice} />
                <NoticeControls
                    notice={notice}
                    onStatusChange={onStatusChange}
                    onAddNotes={onAddNotes}
                    onSettleDeposit={onSettleDeposit}
                />
            </div>

            {selectedNotice === notice.id && (
                <ActionForm
                    actionText={reviewNotes}
                    setActionText={setReviewNotes}
                    onSubmit={() => onNotesSubmit(notice.id)}
                    onCancel={onNotesCancel}
                />
            )}
        </div>
    </InfoCard>
);

export default NoticeCard;
import { useState } from "react";
import InfoDisplay from "../../../sub-components/InfoDisplay";
import ActionButton from "./ActionButton";

const DepositModal = ({ isOpen, onClose, notice, onSubmit }) => {
    const [deductionAmount, setDeductionAmount] = useState('');
    const [deductionReason, setDeductionReason] = useState('');

    if (!isOpen) return null;

    const handleSubmit = () => {
        onSubmit(notice.id, {
            deductionAmount: parseFloat(deductionAmount) || 0,
            deductionReason,
            finalAmount: notice.securityDeposit - (parseFloat(deductionAmount) || 0)
        });
        onClose();
        setDeductionAmount('');
        setDeductionReason('');
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4">
                <div className="p-6">
                    <h3 className="text-lg font-semibold text-purpleDark mb-4">Security Deposit Settlement</h3>

                    <div className="space-y-4">
                        <InfoDisplay label="Tenant" value={`${notice.tenantName} (${notice.roomNumber})`} />
                        <InfoDisplay label="Original Deposit" value={`₹${notice.securityDeposit}`} />

                        <div>
                            <label className="block font-medium text-purpleDark mb-2">Deduction Amount</label>
                            <input
                                type="number"
                                value={deductionAmount}
                                onChange={(e) => setDeductionAmount(e.target.value)}
                                placeholder="Enter deduction amount"
                                className="w-full border border-purpleDarkScale-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purpleDarkScale-400"
                            />
                        </div>

                        <div>
                            <label className="block font-medium text-purpleDark mb-2">Reason for Deduction</label>
                            <textarea
                                value={deductionReason}
                                onChange={(e) => setDeductionReason(e.target.value)}
                                placeholder="Enter reason for deduction (if any)"
                                rows="3"
                                className="w-full border border-purpleDarkScale-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purpleDarkScale-400 resize-none"
                            />
                        </div>

                        <div className="bg-purpleDarkScale-50 p-3 rounded-lg">
                            <InfoDisplay
                                label="Final Refund Amount"
                                value={`₹${notice.securityDeposit - (parseFloat(deductionAmount) || 0)}`}
                                className="font-semibold"
                            />
                        </div>
                    </div>

                    <div className="flex gap-3 mt-6">
                        <ActionButton onClick={handleSubmit} variant="success" className="flex-1">
                            Process Settlement
                        </ActionButton>
                        <ActionButton onClick={onClose} variant="secondary" className="flex-1">
                            Cancel
                        </ActionButton>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DepositModal;
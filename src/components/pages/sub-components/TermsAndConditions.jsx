import React from "react";
import { X } from "lucide-react";

const TermsAndConditions = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 md:p-8 rounded-xl max-w-lg w-full shadow-xl relative">
        {/* header */}
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            Terms & Conditions
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        {/* content */}
        <div className="text-gray-700 text-sm space-y-3">
          <p>
            By registering for a room, you agree to comply with all PG rules and
            regulations. Please read the following carefully:
          </p>

          <ul className="list-disc pl-5 space-y-2">
            <li>Rent must be paid in advance before the 5th of every month.</li>
            <li>
              Any damage to the property will be charged as per the management
              policy.
            </li>
            <li>
              Refunds, if applicable, will follow the PG's official refund
              policy.
            </li>
            <li>
              All guests must submit a valid Aadhaar card for identity
              verification.
            </li>
          </ul>
        </div>

        {/* footer */}
        <div className="mt-6 flex justify-end">
          <button onClick={onClose} className="secondary-button">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;

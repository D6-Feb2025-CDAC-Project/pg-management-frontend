import React, { useState } from 'react';

function Payment() {
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

    const handlePaymentMethodChange = (method) => {
        setSelectedPaymentMethod(method);
    };

    const handleMakePayment = () => {
        if (!selectedPaymentMethod) {
            alert('Please select a payment method');
            return;
        }
        // Handle payment logic here
        alert(`Processing payment via ${selectedPaymentMethod}`);
    };

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Pay Rent
            </h1>

            {/* Rent Details */}
            <div className="bg-white rounded-lg border border-gray-300 mb-6">
                <div className="bg-gray-100 px-4 py-3 border-b border-gray-300">
                    <h2 className="text-lg font-semibold text-gray-800">
                        Rent Details
                    </h2>
                </div>
                <div className="p-4 space-y-3">
                    <div className="flex justify-between">
                        <span className="text-gray-700 font-medium">Room Number:</span>
                        <span className="text-gray-800">Room 205 (Double Room)</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-700 font-medium">Month:</span>
                        <span className="text-gray-800">May 2025</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-700 font-medium">Due Date:</span>
                        <span className="text-gray-800">05/05/2025</span>
                    </div>
                </div>
            </div>

            {/* Payment Breakdown */}
            <div className="bg-white rounded-lg border border-gray-300 mb-6">
                <div className="bg-gray-100 px-4 py-3 border-b border-gray-300">
                    <h2 className="text-lg font-semibold text-gray-800">
                        Payment Breakdown
                    </h2>
                </div>
                <div className="p-4 space-y-3">
                    <div className="flex justify-between">
                        <span className="text-gray-700">Monthly Rent:</span>
                        <span className="text-gray-800">₹15,000</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-700">Maintenance Charges:</span>
                        <span className="text-gray-800">₹2,000</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-700">Electricity Charges:</span>
                        <span className="text-gray-800">₹1,200</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-700">Additional Services:</span>
                        <span className="text-gray-800">₹500</span>
                    </div>
                    <div className="border-t pt-3 mt-3">
                        <div className="flex justify-between font-semibold text-lg">
                            <span className="text-gray-800">Total Amount:</span>
                            <span className="text-gray-800">₹18,700</span>
                        </div>
                    </div>
                </div>

                {/* Warning Message */}
                <div className="mx-4 mb-4 p-3 bg-yellow-100 border border-yellow-300 rounded-md">
                    <p className="text-yellow-800 text-sm">
                        Due in 7 days. Late payment will incur a penalty of 5%.
                    </p>
                </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-lg border border-gray-300 mb-6">
                <div className="bg-blue-100 px-4 py-3 border-b border-gray-300">
                    <h2 className="text-lg font-semibold text-gray-800">
                        Payment Method
                    </h2>
                </div>
                <div className="p-4">
                    <div className="space-y-3">
                        <label className="flex items-center space-x-3 cursor-pointer">
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="Credit/Debit Card"
                                checked={selectedPaymentMethod === 'Credit/Debit Card'}
                                onChange={() => handlePaymentMethodChange('Credit/Debit Card')}
                                className="w-4 h-4 text-purple-600"
                            />
                            <span className="text-gray-700">Credit/Debit Card</span>
                        </label>

                        <label className="flex items-center space-x-3 cursor-pointer">
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="UPI"
                                checked={selectedPaymentMethod === 'UPI'}
                                onChange={() => handlePaymentMethodChange('UPI')}
                                className="w-4 h-4 text-purple-600"
                            />
                            <span className="text-gray-700">UPI</span>
                        </label>

                        <label className="flex items-center space-x-3 cursor-pointer">
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="Net Banking"
                                checked={selectedPaymentMethod === 'Net Banking'}
                                onChange={() => handlePaymentMethodChange('Net Banking')}
                                className="w-4 h-4 text-purple-600"
                            />
                            <span className="text-gray-700">Net Banking</span>
                        </label>
                    </div>

                    <div className="mt-6 flex justify-end">
                        <button
                            onClick={handleMakePayment}
                            className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white font-medium rounded-md transition-colors duration-200"
                        >
                            Make Payment
                        </button>
                    </div>
                </div>
            </div>

            {/* Recent Payment History */}
            <div className="bg-white rounded-lg border border-gray-300 mb-6">
                <div className="bg-gray-100 px-4 py-3 border-b border-gray-300">
                    <h2 className="text-lg font-semibold text-gray-800">
                        Recent Payment History
                    </h2>
                </div>
                <div className="p-4">
                    <div className="space-y-3">
                        <div className="flex justify-between items-center py-2 border-b border-gray-200">
                            <div>
                                <p className="text-gray-800 font-medium">April 2025</p>
                                <p className="text-sm text-gray-600">Paid on 28/04/2025</p>
                            </div>
                            <span className="text-green-600 font-semibold">₹18,200</span>
                        </div>

                        <div className="flex justify-between items-center py-2 border-b border-gray-200">
                            <div>
                                <p className="text-gray-800 font-medium">March 2025</p>
                                <p className="text-sm text-gray-600">Paid on 02/04/2025</p>
                            </div>
                            <span className="text-green-600 font-semibold">₹18,000</span>
                        </div>

                        <div className="flex justify-between items-center py-2">
                            <div>
                                <p className="text-gray-800 font-medium">February 2025</p>
                                <p className="text-sm text-gray-600">Paid on 28/02/2025</p>
                            </div>
                            <span className="text-green-600 font-semibold">₹17,800</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Payment;
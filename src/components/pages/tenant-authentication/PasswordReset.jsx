import { useState } from "react";

const PasswordReset = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email.includes("@")) {
            setMessage("Please enter a valid email address.");
            return;
        }
        setMessage("If this email is registered, you'll receive reset instructions.");
    };

    return (
        <>
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-indigo-600 text-center mb-4">Reset Your Password</h2>
                <p className="text-gray-600 text-center mb-6">Enter your registered email to receive reset instructions.</p>

                {message && <p className="text-sm text-indigo-600 text-center mb-4">{message}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-medium">Email Address</label>
                        <input
                            type="email"
                            className="w-full mt-1 p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <button className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700">
                        Send Reset Link
                    </button>

                </form>
            </div>
        </>
    );
};

export default PasswordReset;

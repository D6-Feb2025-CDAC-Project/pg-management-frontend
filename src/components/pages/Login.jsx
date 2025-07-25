import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { EyeIcon, EyeOffIcon } from "lucide-react";
// import Notification from "../utility/Notification"
// import userService from '../../services/users'
// import blogService from '../../services/bookmarks'

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const loggedInUserJSON = window.localStorage.getItem('loggedInUser');
        if (loggedInUserJSON) {
            const loggedInUser = JSON.parse(loggedInUserJSON);
            setUser(loggedInUser);
            blogService.setToken(loggedInUser.token);
        }
        setLoading(false);
    }, []);

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const loggedInUser = await userService.login({ email, password });

            setUser(loggedInUser);
            blogService.setToken(loggedInUser.token);
            const loggedInUserJSON = JSON.stringify(loggedInUser);
            window.localStorage.setItem('loggedInUser', loggedInUserJSON);

            setEmail('');
            setPassword('');

            navigate('/');

        } catch (exception) {
            setErrorMessage('login failed! please provide valid credentials');
            setTimeout(() => setErrorMessage(null), 5000);
        }
    }

    if (loading) {
        return <div>Loading...</div>; // Display a loading message while checking user
    }

    if (user) {
        return <Navigate replace to="/" />;  // Redirect if user is logged in
    }
    console.log("On login page");
    return (
        <>
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm">

                <h2 className="text-2xl font-semibold text-fuchsia-700 text-center">Welcome Back</h2>
                <p className="text-gray-500 text-center mb-6">Log in to continue</p>

                <form onSubmit={handleLogin}>

                    <div className="mb-4">
                        <label className="block text-gray-600 font-medium mb-2">Email</label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            value={email} onChange={({ target }) => setEmail(target.value)}
                            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-fuchsia-400 outline-none text-base"
                        />
                    </div>


                    <div className="mb-4 relative">
                        <label className="block text-gray-600 font-medium mb-2">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password} onChange={({ target }) => setPassword(target.value)}
                                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-fuchsia-400 outline-none pr-12"
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-4 flex items-center text-gray-500"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>


                    <div className="flex justify-between items-center text-sm text-gray-600 mb-6">
                        <a href="/user/password-reset" target="_blank" rel="noopener noreferrer" className="text-fuchsia-600 hover:underline">Forgot password?</a>
                    </div>


                    <button
                        type="submit"
                        className="w-full bg-fuchsia-600 text-white font-semibold py-3 rounded-xl hover:bg-fuchsia-700 transition"
                    >
                        Login
                    </button>
                </form>

                {/* <p className="mt-4 text-gray-600 text-center">
                    Don't have an account? <a href="/user/register" className="text-fuchsia-600 hover:underline">Sign up</a>
                </p> */}

                {/* <Notification errorMessage={errorMessage} successMessage={null} onErrClose={() => setErrorMessage(null)} onSuccClose={null} /> */}
            </div>
        </>
    );
};

export default Login;

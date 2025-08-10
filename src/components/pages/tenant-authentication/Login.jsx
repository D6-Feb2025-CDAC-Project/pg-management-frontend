import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { login } from "./../../../services/UserService";
import { toast } from "react-toastify";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    // const loggedInUserJSON = window.localStorage.getItem("loggedInUser");
    // if (loggedInUserJSON) {
    //   const loggedInUser = JSON.parse(loggedInUserJSON);
    //   setUser(loggedInUser);
    //   blogService.setToken(loggedInUser.token);
    // }
    setLoading(false);
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    if (email === "") {
      alert("Please enter email or username");
    } else if (password === "") {
      alert("Please enter password");
    } else {
      try {
        const loggedInUser = await login(email, password);

        setUser(loggedInUser);
        window.localStorage.setItem(
          "loggedInUser",
          JSON.stringify(loggedInUser)
        );

        setEmail("");
        setPassword("");
        toast.success("Logged In Successfully...");
        if (loggedInUser.userrole == "ROLE_ADMIN") {
          navigate("/admin/dashboard");
        } else if (loggedInUser.userrole == "ROLE_USER") {
          navigate("/tenant/dashboard");
        }
      } catch (error) {
        console.error("Login failed:", error);

        if (error.response && error.response.status === 401) {
          alert("Invalid Email or Password.");
        } else {
          alert("Something went wrong. Please try again later.");
        }

        setErrorMessage("Login failed!");
        setTimeout(() => setErrorMessage(null), 5000);
      }
    }
  };

  // if (loading) {
  //   return <div>Loading...</div>; // Display a loading message while checking user
  // }

  // if (user) {
  //   return <Navigate replace to="/" />; // Redirect if user is logged in
  // }
  // console.log("On login page");
  return (
    <>
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-purpleDarkScaleScale-700 text-center">
          Welcome Back
        </h2>
        <p className="text-gray-500 text-center mb-6">Log in to continue</p>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-600 font-medium mb-2">
              Email
            </label>
            <input
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purpleDarkScaleScale-400 outline-none text-base"
            />
          </div>

          <div className="mb-4 relative">
            <label className="block text-gray-600 font-medium mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purpleDarkScale-400 outline-none pr-12"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-4 flex items-center text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOffIcon className="w-5 h-5" />
                ) : (
                  <EyeIcon className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-purpleDarkScale-600 text-white font-semibold py-3 rounded-xl hover:bg-purpleDarkScale-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;

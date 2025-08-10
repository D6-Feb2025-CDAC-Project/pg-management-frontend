import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { login } from "./../../../services/UserService";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { login as loginAction } from "../../../redux/slices/authSlice";
import Loader from "../../shared/Loader";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    setLoading(true);
    event.preventDefault();

    if (email === "") {
      toast.warn("Please enter email");
      setLoading(false);
    } else if (password === "") {
      toast.warn("Please enter password");
      setLoading(false);
    } else {
      try {
        const response = await login(email, password);

        const expiresAt = Date.now() + 10 * 60 * 60 * 1000; // token expiry -> 10 hours

        dispatch(
          loginAction({
            user: {
              id: response.userid,
              username: response.username,
              role: response.userrole,
            },
            token: response.token,
            expiresAt,
          })
        );

        setLoading(false);
        toast.success("Logged In Successfully...");

        if (response.userrole == "ROLE_ADMIN") {
          navigate("/admin/dashboard");
        } else if (response.userrole == "ROLE_USER") {
          navigate("/tenant/dashboard");
        }
      } catch (error) {
        console.error("Login failed:", error);

        if (error.response && error.response.status === 401) {
          setLoading(false);
          toast.error("Invalid Email or Password.");
        } else {
          setLoading(false);
          toast.error("Something went wrong. Please try again later.");
        }

        setEmail("");
        setPassword("");
      }
    }
  };

  if (loading) {
    return <Loader />;
  }

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

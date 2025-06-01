import { User } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useAuth";

const Login = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  // const [isLoading, setIsLoading] = useState(false);
  // const [isError, setIsError] = useState(null);
  const navigate = useNavigate();
  const [formError, setFormError] = useState(null);

  const { mutate, isPending, isError, error } = useLogin();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.id]: e.target.value });

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   try {
  //     setIsError("");
  //     setIsLoading(true);
  //     const res = await axios.post(
  //       "https://fgtl4lv52k.execute-api.ap-south-1.amazonaws.com/stageTodo/stageTodo/login",
  //       {
  //         email: form.email,
  //         password: form.password,
  //       }
  //     );

  //     setIsLoading(false);
  //     console.log("Res data --> ", res.data);

  //     if (res.data.error) {
  //       setIsError(res.data.error || null);
  //       return;
  //     }

  //     if (!isError) {
  //       setIsError(null);
  //       localStorage.setItem(
  //         "accessToken",
  //         res.data.data.AuthenticationResult.AccessToken
  //       );
  //       localStorage.setItem("idToken", res.data.data.AuthenticationResult.IdToken);
  //       localStorage.setItem(
  //         "refreshToken",
  //         res.data.data.AuthenticationResult.RefreshToken
  //       );
  //       navigate("/");
  //     }
  //   } catch (error) {
  //     setIsLoading(false);
  //     console.log("Error -> ", error);
  //     console.log("error body -> ", error.body);
  //     console.log("error message -> ", error.message);

  //     alert(
  //       "Signup failed: " + error?.response?.data?.message ||
  //         error.message ||
  //         "Unknown error"
  //     );
  //   }
  // };

  const handleLogin = async (e) => {
    e.preventDefault();
    mutate(form, {
      onSuccess: (data) => {
        if (data?.error) {
          setFormError(data.error);
          return;
        }

        const { AccessToken, IdToken, RefreshToken } =
          data?.data?.AuthenticationResult || {};
        const { name, email } = data.user;
        localStorage.setItem("accessToken", AccessToken);
        localStorage.setItem("idToken", IdToken);
        localStorage.setItem("refreshToken", RefreshToken);
        localStorage.setItem("name", name);
        localStorage.setItem("email", email);
        navigate("/");
      },
      onError: (err) => {
        console.error(err);
        setFormError(err?.response?.data?.error || "Login failed. Try again.");
      },
    });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md shadwow-lg">
          <div className="flex flex-col items-center mb-6 gap-2">
            <div className="bg-blue-200 w-20 h-20 rounded-full flex items-center justify-center shadow">
              <User className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-center mt-5">
              Welcome Back
            </h2>
            <p className="text-sm text-gray-500">Log in to your account</p>
            {isError && (
              <p className="text-red-600 text-center leading-none">
                {formError|| error || "Login failed"}
              </p>
            )}
          </div>
          <form className="mt-6" onSubmit={handleLogin}>
            <div className="mb-5">
              <label className="block text-sm font-medium mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="text-sm w-full p-2 border border-gray-300 rounded-md transition-all duration-200 outline-none focus:border-slate-500"
                required
                placeholder="abc@email.com"
                value={form.email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-sm font-medium mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full p-2 border border-gray-300 rounded-md outline-none focus:border-slate-500"
                required
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700 transition duration-200"
            >
              {isPending ? "Loging in..." : "Login"}
            </button>
          </form>
          <div className="mt-6 text-center">
            <Link className="text-sm text-blue-600" to={"/signup"}>
              Don't have an account? Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

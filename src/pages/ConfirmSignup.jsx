import { useState } from "react";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useConfirmSignup } from "../hooks/useAuth";

const ConfirmSignup = () => {
  const [form, setForm] = useState({ email: "", code: "" });
  // const [isLoading, setIsLoading] = useState(false);
  // const [isError, setIsError] = useState(null);
  const navigate = useNavigate();
  const { mutate, isPending, isError, error } = useConfirmSignup();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.id]: e.target.value });

  // const handleConfirm = async (e) => {
  //   e.preventDefault();
  //   setIsLoading(true);
  //   try {
  //     const res = await axios.post(
  //       "https://fgtl4lv52k.execute-api.ap-south-1.amazonaws.com/stageTodo/stageTodo/confirm",
  //       {
  //         email: form.email,
  //         code: form.code,
  //       }
  //     );

  //     setIsLoading(false);
  //     console.log("Response data -> ", res.data);

  //     if (res.data.error) {
  //       setIsError(res.data.error || null);
  //       return;
  //     }

  //     if (res.data.message === "User confirmed successfully!") {
  //       alert("Account confirmed! You can now log in.");
  //       navigate("/login");
  //     }

  //   } catch (error) {
  //     setIsLoading(false);
  //     console.error(error?.response?.data || error.message);
  //     alert(
  //       "Error confirming: " + (error?.response?.data?.message || error.message)
  //     );
  //   }
  // };

  const handleConfirm = async (e) => {
    e.preventDefault();
    mutate(form, {
      onSuccess: (data) => {
        if (data?.message === "User confirmed successfully!") {
          alert("Account confirmed! You can now log in.");
          navigate("/login");
        } else {
          alert("Confirmation failed: " + data?.error || "Unknown error");
        }
      },
      onError: (err) => {
        console.error(err);
        alert(err?.response?.data?.error || "Failed to confirm. Try again.");
      }
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex justify-center items-center">
      <form
        onSubmit={handleConfirm}
        className="bg-white shadow-lg p-6 rounded-lg w-full max-w-sm pt-8 pb-8"
      >
        <div className="flex flex-col justify-center items-center gap-2 mb-6">
          <h2 className="text-2xl font-bold text-center  ">Confirm Account</h2>
          <p className="text-sm text-slate-500">Confirm your account</p>
          {isError && (
            <p className="text-sm text-red-600 text-center leading-none">
              {error?.response?.data?.error || "Failed to confirm account"}
            </p>
          )}
        </div>

        <div className="my-4">
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            id="email"
            value={form.email}
            onChange={handleChange}
            className="text-sm w-full p-2 border border-gray-300 rounded-md transition-all duration-200 outline-none focus:border-slate-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Confirmation Code
          </label>
          <input
            type="text"
            id="code"
            value={form.code}
            onChange={handleChange}
            className="text-sm w-full p-2 border border-gray-300 rounded-md transition-all duration-200 outline-none focus:border-slate-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          {isPending ? "Confirming..." : "Confirm"}
        </button>
      </form>
    </div>
  );
};

export default ConfirmSignup;

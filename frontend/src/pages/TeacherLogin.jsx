import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const TeacherLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user.role === "teacher") {
        navigate("/teacherDashboard");
      } else {
        navigate("/studentDashboard");
      }
    }
  }, [navigate]);

  const handleStartQuiz = async () => {
    setLoading(true);
    if (username.trim() !== "" && password.trim() !== "") {
      // Logic to start the quiz
      console.log(`Starting quiz for user: ${username}`);
      try {
        const res = await axios.post("http://localhost:3000/user/create", {
          email,
          password,
          name: username,
          role: "teacher",
        });
        console.log(res.data);
        if (!res.data.success) {
          alert(res.data.message);
        }
        localStorage.setItem("user", JSON.stringify(res.data.data));
        setLoading(false);
        if (res.data.data.role === "teacher") {
          navigate("/teacherDashboard");
        } else {
          navigate("/studentDashboard");
        }
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    } else {
      alert("Please enter your username");
      setLoading(false);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md text-white w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center border-b-2 border-green-400 pb-4">
          Login
        </h1>
        <input
          type="text"
          className="w-full p-2 mb-4 text-black rounded"
          placeholder="Username*"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          className="w-full p-2 mb-4 text-black rounded"
          placeholder="Email*"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="w-full p-2 mb-4 text-black rounded"
          placeholder="Password*"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleStartQuiz}
          className="w-full border-green-400 bg-green-400  hover:bg-green-600 text-black font-bold py-2 px-4 rounded"
        >
          Start Quiz
        </button>
        <h1>
          {" "}
          If you are student <Link to="/">Click here</Link>
        </h1>
      </div>
    </div>
  );
};

export default TeacherLogin;

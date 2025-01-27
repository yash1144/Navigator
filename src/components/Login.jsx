import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "./Context/AuthContext";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!email || !password) {
            setError("All fields are required");
            return;
        }

        try {
            await login(email, password);
            navigate("/home"); 
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <>
            <div>
                <h2>Login</h2>
                {error && <p>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="password">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                    >
                        Login
                    </button>
                    <div>
                        <p>
                            Dont have an account? <Link to="/">Sign Up</Link>
                        </p>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Login;

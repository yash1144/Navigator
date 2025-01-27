import { useNavigate } from "react-router-dom";
import { useAuth } from "./Context/AuthContext";

function Home() {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = async () => {
        try {
            await logout();
            navigate("/login"); 
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    return (    
        <div>
            <h1>Welcome to the Home Page</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default Home;

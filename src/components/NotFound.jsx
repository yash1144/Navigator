import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <div>
        <h1>Error-404</h1>  
        <p>Page Not Found</p>
        <p>The page you are looking for might have been removed, renamed, or does not exist.</p>
        <Link to="/">Go Back Home</Link>
      </div>
    </>
  );
};

export default NotFound;

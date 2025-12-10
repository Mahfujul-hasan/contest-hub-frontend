import { Link } from "react-router";
import notFoundImg from "../../assets/not-found-404.png"

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center max-w-7xl mx-auto my-10">
            
            <img src={notFoundImg} alt="" className="w-1/3" />
            <h3 className="text-4xl font-bold text-center text-primary mb-5">Oops..... Page not found!</h3>
            <p className="mb-5">The page you're looking for doesn't exist or may have been moved</p>
            <Link to="/"><button className="btn btn-primary text-base font-bold">Go Home</button></Link>
        </div>
    );
};

export default NotFound;
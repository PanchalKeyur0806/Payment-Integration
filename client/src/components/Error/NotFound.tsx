import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className=" flex flex-col items-center justify-center h-screen">
      <div className="text-4xl font-bold">Not Found</div>

      {/* link */}
      <div>
        <Link to={"/products"} className="text-blue-600 font-bold">
          Go to Products page
        </Link>
      </div>
    </section>
  );
};

export default NotFound;

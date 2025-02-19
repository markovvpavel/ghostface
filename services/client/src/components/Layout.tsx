import { useEffect } from "react";

export const Layout = () => {
  useEffect(() => {
    console.log(process.env);
  }, []);

  return (
    <div className="h-screen w-screen overflow-hidden flex justify-center items-center">
      <span className="text-neutral-100">
        API_URL: {process.env.REACT_APP_API_URL}
      </span>
    </div>
  );
};

import { RouterProvider } from "react-router-dom";
import { routes } from "./Router";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      <Toaster
        toastOptions={{
          className: "",
          style: {
            fontSize: "12px",
          },
        }}
      />
      <RouterProvider router={routes} />{" "}
    </>
  );
};

export default App;

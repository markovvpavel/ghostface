import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { Layout } from "@/components/Layout";
import store from "@/app/store";

function App() {
  return (
    <Provider store={store}>
      <ToastContainer />
      <Layout />
    </Provider>
  );
}

export default App;

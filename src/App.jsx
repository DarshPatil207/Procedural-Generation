import Home from "./pages/Home";
import Impacts from "./pages/Impacts";
import Solutions from "./pages/Solutions";
import "./App.css";

function App() {
  const path = window.location.pathname;

  // Add another pathname here when you create a new top-level page.
  if (path === "/impacts") return <Impacts />;
  if (path === "/solutions") return <Solutions />;
  // The root URL (/) is the homepage and the default fallback.
  return <Home />;
}

export default App;
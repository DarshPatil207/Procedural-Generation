import Header from "./components/Header";
import Card from "./components/Card";
import Footer from "./components/Footer"
import "./App.css"

function App() {
  return (
    <div>
      <Header />
      <Card
          title="Education"
          description="AI tutors can provide personalized instruction."
      />
      <Card
          title="Healthcare"
          description="AI can help doctors diagnose diseases."
      />
      <Card
          title="Employment"
          description="AI may automate some jobs while creating others."
      />
      <Footer/>
    </div>

  );
}

export default App;
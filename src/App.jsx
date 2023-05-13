import { Calculator } from "./components/Calculator";
import { Squares } from "./components/Squares";

function App() {
return (
  <div 
    className="h-screen w-screen bg-black text-white flex justify-center items-center"
    >
    <Calculator/>
    <Squares/>
  </div>
);
}

export default App;

import "./App.css";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import ErrorBoundary from "./Components/ErrorBoundary";
import { AllRoutes } from "./Pages/AllRoutes";


function App() {
  
  return (
    <div className="App">
      <ErrorBoundary message="Navigation component failed to load">
        <Navbar />
      </ErrorBoundary>
    
      <ErrorBoundary message="Main content failed to load" showDetails={true}>
        <AllRoutes />
      </ErrorBoundary>
     
      <ErrorBoundary message="Footer component failed to load">
        <Footer />
      </ErrorBoundary>
    </div>
  );
}

export default App;

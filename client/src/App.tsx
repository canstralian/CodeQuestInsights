import { Switch, Route } from "wouter";
import Home from "@/pages/Home";
import AnalysisResult from "@/pages/AnalysisResult";
import NotFound from "@/pages/not-found";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

function Router() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/analysis/:repoUrl" component={AnalysisResult} />
          <Route component={NotFound} />
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

function App() {
  return <Router />;
}

export default App;

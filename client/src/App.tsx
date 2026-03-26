import { Route, Switch } from "wouter";
import Home from "./pages/Home";
import { useTranslation } from '../hooks/useTranslation';

const { t } = useTranslation();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
    </Switch>
  );
}

function App() {
  return (
      <Router />
  );
}

export default App;
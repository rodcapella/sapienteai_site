import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import ArticleDetail from "./pages/ArticleDetail";
import AIPillar from "./pages/AIPillar";
import LGPD from "./pages/LGPD";
import Termos from "./pages/Termos";
import Privacidade from "./pages/Privacidade";
import GDPR from "./pages/GDPR";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";


function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/blog"} component={Blog} />
      <Route path={"/blog/:slug"} component={ArticleDetail} />
      <Route path={"/ia-para-empresas"} component={AIPillar} />
      <Route path={"/lgpd"} component={LGPD} />
      <Route path={"/termos"} component={Termos} />
      <Route path={"/privacidade"} component={Privacidade} />
      <Route path={"/gdpr"} component={GDPR} />
      <Route path={"/terms"} component={Terms} />
      <Route path={"/privacy"} component={Privacy} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <ThemeProvider
          defaultTheme="light"
          // switchable
        >
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </ThemeProvider>
      </LanguageProvider>
    </ErrorBoundary>
  );
}

export default App;

import { useLocation } from "wouter";
import { useEffect } from "react";

export function useLanguage() {
  const [location, setLocation] = useLocation();

  // detectar idioma da URL
  const langFromUrl = location.startsWith("/en") ? "en" : "pt";

  // persistência
  useEffect(() => {
    localStorage.setItem("lang", langFromUrl);
  }, [langFromUrl]);

  function switchLanguage() {
    const newLang = langFromUrl === "pt" ? "en" : "pt";

    const newPath = location.replace(/^\/(pt|en)/, `/${newLang}`);

    setLocation(newPath);
  }

  return {
    lang: langFromUrl,
    switchLanguage
  };
}
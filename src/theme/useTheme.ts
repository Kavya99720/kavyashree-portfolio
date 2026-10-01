import { useEffect, useState } from "react";
import { type Theme, applyTheme, getCurrentTheme, getStoredTheme } from "./theme";

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => getStoredTheme() ?? getCurrentTheme());

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return { theme, toggle };
}

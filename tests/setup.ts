import "@testing-library/jest-dom/vitest";
import { afterEach, beforeEach } from "vitest";
import { cleanup } from "@testing-library/react";

// Simulate index.html's inline pre-paint theme script, which jsdom never runs.
beforeEach(() => {
  if (typeof document === "undefined") return;
  document.documentElement.classList.add("dark");
});

afterEach(() => {
  if (typeof document === "undefined") return;
  cleanup();
  localStorage.clear();
  document.documentElement.classList.add("dark");
});

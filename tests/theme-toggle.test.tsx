import { describe, it, expect } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../src/App";

describe("Theme toggle (FR-13)", () => {
  it("defaults to dark theme", () => {
    render(<App />);
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  it("switches to light theme on click and persists it to localStorage", async () => {
    const user = userEvent.setup();
    render(<App />);

    const toggle = screen.getByRole("button", {
      name: /switch to light theme/i,
    });
    await user.click(toggle);

    expect(document.documentElement.classList.contains("dark")).toBe(false);
    expect(localStorage.getItem("theme")).toBe("light");
  });

  it("keeps the light theme after remounting", async () => {
    const user = userEvent.setup();
    const { unmount } = render(<App />);
    const toggle = screen.getByRole("button", {
      name: /switch to light theme/i,
    });
    await user.click(toggle);
    unmount();
    cleanup();

    render(<App />);
    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });
});

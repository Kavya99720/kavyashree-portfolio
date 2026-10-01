import { describe, it, expect } from "vitest";
import { render, within } from "@testing-library/react";
import App from "../src/App";

describe("Experience section (FR-04)", () => {
  it("lists both resume roles with company, dates, and bullets", () => {
    render(<App />);
    const experience = document.getElementById("experience") as HTMLElement;
    expect(experience).toBeInTheDocument();
    const scope = within(experience);

    expect(
      scope.getByText(/data science intern \(generative ai\)/i),
    ).toBeInTheDocument();
    expect(scope.getByText(/cellstrat/i)).toBeInTheDocument();
    expect(scope.getByText(/jun 2026.*present/i)).toBeInTheDocument();

    expect(
      scope.getByText(/android app development using generative ai intern/i),
    ).toBeInTheDocument();
    expect(scope.getByText(/mind matrix/i)).toBeInTheDocument();
    expect(scope.getByText(/feb 2026.*may 2026/i)).toBeInTheDocument();

    const bullets = scope.getAllByRole("listitem");
    expect(bullets.length).toBeGreaterThanOrEqual(4);
  });
});

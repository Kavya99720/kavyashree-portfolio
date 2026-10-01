import { describe, it, expect } from "vitest";
import { render, within } from "@testing-library/react";
import App from "../src/App";

describe("Education section (FR-08)", () => {
  it("lists all 3 resume education entries", () => {
    render(<App />);
    const education = document.getElementById("education") as HTMLElement;
    expect(education).toBeInTheDocument();
    const scope = within(education);

    expect(
      scope.getByText(/B\.E\. Computer Science & Engineering/i),
    ).toBeInTheDocument();
    expect(scope.getByText(/Vemana Institute of Technology/i)).toBeInTheDocument();
    expect(scope.getByText(/CGPA 8\.32/)).toBeInTheDocument();

    expect(scope.getByText(/Pre-University \(PCMB\)/i)).toBeInTheDocument();
    expect(scope.getByText(/SVVN PU College/i)).toBeInTheDocument();
    expect(scope.getByText(/84\.8%/)).toBeInTheDocument();

    expect(scope.getByText(/New Macaulay English School/i)).toBeInTheDocument();
    expect(scope.getByText(/92%/)).toBeInTheDocument();
    expect(education.textContent).toMatch(/SSLC/);
  });
});

import { describe, it, expect } from "vitest";
import { render, within } from "@testing-library/react";
import App from "../src/App";

describe("Contact section (FR-10, FR-12)", () => {
  it("renders exactly 3 contact links with no form and no phone", () => {
    render(<App />);
    const contact = document.getElementById("contact") as HTMLElement;
    expect(contact).toBeInTheDocument();
    const scope = within(contact);

    expect(
      scope.getByRole("link", { name: /email|kavyashreecv2@gmail\.com/i }),
    ).toHaveAttribute("href", "mailto:kavyashreecv2@gmail.com");
    expect(scope.getByRole("link", { name: /linkedin/i })).toHaveAttribute(
      "href",
      "https://linkedin.com/in/kavyashree-cv-ai",
    );
    expect(scope.getByRole("link", { name: /github/i })).toHaveAttribute(
      "href",
      "https://github.com/Kavya99720",
    );

    expect(contact.querySelector("form")).not.toBeInTheDocument();
    expect(contact.querySelector('a[href^="tel:"]')).not.toBeInTheDocument();
    expect(contact.textContent).not.toMatch(/\+91/);
  });

  it("has a Download Resume button linking to the public redacted PDF", () => {
    render(<App />);
    const contact = document.getElementById("contact") as HTMLElement;
    const link = within(contact).getByRole("link", {
      name: /download resume/i,
    });
    expect(link).toHaveAttribute("href", "/Kavyashree_CV_Resume_Public.pdf");
    expect(link).toHaveAttribute("download");
  });
});

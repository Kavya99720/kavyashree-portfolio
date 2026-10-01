import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("no critical/serious accessibility violations in dark theme", async ({
  page,
}) => {
  await page.goto("/");
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa"])
    .analyze();

  const severe = results.violations.filter((v) =>
    ["critical", "serious"].includes(v.impact ?? ""),
  );
  expect(severe, JSON.stringify(severe, null, 2)).toHaveLength(0);
});

test("no critical/serious accessibility violations in light theme", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: /switch to light theme/i }).click();

  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa"])
    .analyze();

  const severe = results.violations.filter((v) =>
    ["critical", "serious"].includes(v.impact ?? ""),
  );
  expect(severe, JSON.stringify(severe, null, 2)).toHaveLength(0);
});

test("all interactive elements are reachable via Tab in logical order", async ({
  page,
}) => {
  await page.goto("/");

  const expectedRoles = [
    { role: "link", name: /kc/i },
    { role: "link", name: /about/i },
    { role: "link", name: /skills/i },
    { role: "link", name: /experience/i },
    { role: "link", name: /projects/i },
    { role: "link", name: /education/i },
    { role: "link", name: /certifications/i },
    { role: "link", name: /contact/i },
    { role: "button", name: /switch to (light|dark) theme/i },
    { role: "link", name: /download resume/i },
  ];

  for (const expected of expectedRoles) {
    await page.keyboard.press("Tab");
    const focused = page.locator(":focus");
    await expect(focused).toHaveAccessibleName(expected.name);
  }
});

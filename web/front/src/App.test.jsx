import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, vi, expect } from "vitest";

import App from "./App";
import { act } from "react";

globalThis.fetch = vi.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve([
        {
          id: 1,
          title: "Test book",
          imageUrl: "https://example.com",
          description: "A test book",
          pageCount: 100,
          listedPrice: {
            currencyCode: "USD",
            amount: 10,
          },
        },
      ]),
  })
);

describe("App", () => {
  it("calls /api/books", () => {
    render(<App />);

    expect(globalThis.fetch.mock.calls.length).toBe(1);
    expect(globalThis.fetch.mock.calls[0][0]).toBe("/api/books");
  });

  it("renders book cards", () => {
    render(<App />);

    waitFor(() => {
      expect(screen.queryByText("A test book")).toBeInTheDocument();
    });
  });

  it("adds book to cart", async () => {
    await act(() => {
      render(<App />);
    });

    await waitFor(() => {
      screen.getByText("Add to Cart").click();
    });

    waitFor(() => {
      expect(screen.getByText("Total Price 10.00")).toBeInTheDocument();
    });
  });

  it("updates cart item quantity", async () => {
    await act(() => {
      render(<App />);
    });

    await waitFor(() => {
      screen.getByText("Add to Cart").click();
    });

    await waitFor(() => {
      screen.queryByDisplayValue("1").value = "5";
      screen.getByText("Update quantity").click();
    });

    waitFor(() => {
      expect(screen.getByText("Total Price 50.00")).toBeInTheDocument();
    });

    await waitFor(() => {
      screen.queryByDisplayValue("5").value = "101";
      screen.getByText("Update quantity").click();
    });

    waitFor(() => {
      expect(screen.getByText("Total Price 50.00")).toBeInTheDocument();
      expect(screen.getByText("Sorry! Number invalid")).toBeVisible();
    });
  });
});

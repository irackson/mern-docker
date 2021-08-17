import { render, screen } from "@testing-library/react";
import App from "./App";

// test("test CI pipeline with fail", () => {
//     // render(<App />);
//     // const linkElement = screen.getByText(/Bart Yasso/i);
//     // expect(linkElement).toBeInTheDocument();
//     console.log("THE FAIL TEST HAS BEGUN");
//     expect(true).toBe(false);
//     console.log("THE FAIL TEST HAS ENDED");
// });

test("test CI pipeline with pass", () => {
    // render(<App />);
    // const linkElement = screen.getByText(/Bart Yasso/i);
    // expect(linkElement).toBeInTheDocument();
    console.log("THE PASS TEST HAS BEGUN");
    expect(true).toBe(true);
    console.log("THE PASS TEST HAS ENDED");
});

import { fireEvent, render, screen } from "@testing-library/react";
import Header from "../Header";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import appStore from "./../../redux/appStore";
import '@testing-library/jest-dom';

it("Should load the header", () => {
    render(
        <BrowserRouter>
            <Provider store={appStore}>
                <Header />
            </Provider>
        </BrowserRouter>
    );
});

it("Should load the header and with item cart 0", () => {
    render(
        <BrowserRouter>
            <Provider store={appStore}>
                <Header />
            </Provider>
        </BrowserRouter>
    );

    const cartItem = screen.getByText("Cart (0)");
    expect(cartItem).toBeInTheDocument();
});

it("Should load the header and when click on login button it chaange to logout", () => {
    render(
        <BrowserRouter>
            <Provider store={appStore}>
                <Header />
            </Provider>
        </BrowserRouter>
    );

    const button = screen.getByRole("Button", {name:"Login"});
    fireEvent.click(button);
    button = screen.getByRole("Button", {name:'Log-out'});
    expect(button).toBeInTheDocument();
});

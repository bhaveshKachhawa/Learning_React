test("should dispatch emptyCart action when button is clicked", () => {
    const store = mockStore({
        cart: { items: [{ id: 1, name: "Pizza" }] }
    });

    render(
        <Provider store={store}>
            <Cart />
        </Provider>
    );

    const emptyBtn = screen.getByRole("button", { name: /empty cart/i });
    fireEvent.click(emptyBtn);

    const actions = store.getActions();
    expect(actions[0].type).toBe("cart/emptyCart");
});
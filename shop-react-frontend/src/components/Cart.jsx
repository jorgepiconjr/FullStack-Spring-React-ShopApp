import React, { useContext, useState, useEffect } from "react";
import AppContext from "../Context/Context";
import axios from "axios";
import CheckoutPopup from "./CheckoutPopup";
import { Button } from 'react-bootstrap';

const Cart = () => {
    const { cart, removeFromCart , clearCart } = useContext(AppContext);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchImagesAndUpdateCart = async () => {
            console.log("Cart", cart);
            try {
                const response = await axios.get("http://localhost:8080/api/products");
                const backendProductIds = response.data.map((product) => product.id);

                const updatedCartItems = cart.filter((item) => backendProductIds.includes(item.id));
                const cartItemsWithImages = await Promise.all(
                    updatedCartItems.map(async (item) => {
                        try {
                            return { ...item };
                        } catch (error) {
                            console.error("Error fetching image:", error);
                            return { ...item };
                        }
                    })
                );
                console.log("cart",cart)
                setCartItems(cartItemsWithImages);
            } catch (error) {
                console.error("Error fetching product data:", error);
            }
        };

        if (cart.length) {
            fetchImagesAndUpdateCart();
        }
    }, [cart]);

    useEffect(() => {
        const total = cartItems.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0
        );
        setTotalPrice(total);
    }, [cartItems]);

    const handleIncreaseQuantity = (itemId) => {
        const newCartItems = cartItems.map((item) => {
            if (item.id === itemId) {
                if (item.quantity < item.quantity) {
                    return { ...item, quantity: item.quantity + 1 };
                } else {
                    alert("Cannot add more than available stock");
                }
            }
            return item;
        });
        setCartItems(newCartItems);
    };

    const handleDecreaseQuantity = (itemId) => {
        const newCartItems = cartItems.map((item) =>
            item.id === itemId
                ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
                : item
        );
        setCartItems(newCartItems);
    };

    const handleRemoveFromCart = (itemId) => {
        removeFromCart(itemId);
        const newCartItems = cartItems.filter((item) => item.id !== itemId);
        setCartItems(newCartItems);
    };

    const handleCheckout = async () => {
        try {
            for (const item of cartItems) {
                const { stockQuantity, ...rest } = item;
                const updatedStockQuantity = item.stockQuantity - item.quantity;

                const updatedProductData = { ...rest, stockQuantity: updatedStockQuantity };
                console.log("updated product data", updatedProductData)

                const cartProduct = new FormData();
                cartProduct.append(
                    "product",
                    new Blob([JSON.stringify(updatedProductData)], { type: "application/json" })
                );

                await axios
                    .put(`http://localhost:8080/api/product/${item.id}`, cartProduct, {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    })
                    .then((response) => {
                        console.log("Product updated successfully:", (cartProduct));
                    })
                    .catch((error) => {
                        console.error("Error updating product:", error);
                    });
            }
            clearCart();
            setCartItems([]);
            setShowModal(false);
            alert("Checkout successful!")
        } catch (error) {
            console.log("error during checkout", error);
        }
    };

    return (
        <div className="cart-container vw-100 vh-100">
            <div className="shopping-cart">
                <div className="title py-5 fst-italic">
                    <h2 className="text-center fw-bold">
                        <i
                        className="bi bi-cart fw-bold"
                        >
                        </i>
                        Cart
                    </h2>
                </div>
                {cartItems.length === 0 ? (
                    <div className="empty" style={{ textAlign: "left", padding: "2rem" }}>
                        <h4>Your cart is empty</h4>
                    </div>
                ) : (
                    <>
                        {cartItems.map((item) => (
                            <li key={item.id} className="cart-item">
                                <div
                                    className="item"
                                    style={{ display: "flex", alignContent: "center" }}
                                    key={item.id}
                                >
                                    <div className="description">
                                        <span className="fst-italic">{item.brand}</span>
                                        <span className="fw-bold fs-5">{item.name}</span>
                                    </div>

                                    <div className="quantity">
                                        <button
                                            className="plus-btn"
                                            type="button"
                                            name="button"
                                            onClick={() => handleIncreaseQuantity(item.id, item.quantity)}
                                        >
                                            <i className="bi bi-plus-square-fill"></i>
                                        </button>
                                        <input
                                            type="button"
                                            name="name"
                                            value={item.quantity}
                                            readOnly
                                        />
                                        <button
                                            className="minus-btn"
                                            type="button"
                                            name="button"
                                            onClick={() => handleDecreaseQuantity(item.id)}
                                        >
                                            <i className="bi bi-dash-square-fill"></i>
                                        </button>
                                    </div>
                                    <div className="total-price text-success fw-bold" style={{ textAlign: "center" }}>
                                        ${item.price * item.quantity}
                                    </div>
                                    <button
                                        className="remove-btn"
                                        onClick={() => handleRemoveFromCart(item.id)}
                                    >
                                        <i className="bi bi-trash3-fill text-danger"></i>
                                    </button>
                                </div>
                            </li>
                        ))}
                        <div className="total">
                            <h5>Total: </h5>
                            <h5><span className="text-success fw-bold mx-3 "> ${totalPrice}</span></h5>
                        </div>
                        <Button
                            className="btn btn-primary mt-5 p-4 fw-bold fs-5"
                            style={{ width: "auto", alignSelf: "center" }}
                            onClick={() => setShowModal(true)}
                        >
                            Checkout
                        </Button>
                    </>
                )}
            </div>
            <CheckoutPopup
                show={showModal}
                handleClose={() => setShowModal(false)}
                cartItems={cartItems}
                totalPrice={totalPrice}
                handleCheckout={handleCheckout}
            />
        </div>

    );
};

export default Cart;
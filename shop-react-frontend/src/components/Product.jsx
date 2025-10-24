import {redirect, useNavigate, useParams} from "react-router-dom";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import AppContext from "../Context/Context";
import axios from "../axios";
import react from "../assets/react.svg"
import { Link } from "react-router-dom";
import UpdateProduct from "./UpdateProduct";

const Product = () => {
    const { id } = useParams();
    const { data, addToCart, removeFromCart, cart, refreshData } =
        useContext(AppContext);
    const [product, setProduct] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8080/api/product/${id}`
                );
                setProduct(response.data);
                console.log("PRODUCT DETAILS:", response.data);
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };

        fetchProduct();
    }, [id]);

    const deleteProduct = async () => {
        try {
            await axios.delete(`http://localhost:8080/api/product/${id}`);
            removeFromCart(id);
            console.log("Product deleted successfully");
            alert("Product deleted successfully");
            refreshData();
            navigate("/");
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    const handleEditClick = () => {
        navigate(`/product/update/${id}`);
    };

    const handlAddToCart = () => {
        addToCart(product);
        alert("Product added to cart");
    };
    if (!product) {
        return (
            <h2 className="text-center" style={{ padding: "10rem" }}>
                Loading...
            </h2>
        );
    }
    return (
        <>
            <div className="containers" style={{ display: "flex" }}>
                <img
                    className="left-column-img"
                    src={react}
                    alt={product.imageName}
                    style={{ width: "15%", height: "50%" }}
                />

                <div className="card right-column"
                     style={{
                         width: "50%",
                         boxShadow: "0 4px 8px rgba(0,0,0,0.6)",
                        borderRadius: "30px",
                         padding: "30px"
                         }}
                >
                    <div className="product-description">
                        <div style={{display:'flex',justifyContent:'space-between' }}>
                            <span style={{ fontSize: "1.2rem", fontWeight: 'bold' }}>
                              {product.category}
                            </span>
                            <p className="release-date" style={{ marginBottom: "2rem" }}>
                                <h6>Listed : <span> <i> {product.date}</i></span></h6>
                            </p>
                        </div>
                        <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem",textTransform: 'capitalize', letterSpacing:'1px' }}>
                            {product.name}
                        </h1>
                        <i style={{ marginBottom: "3rem" }}>{product.brand}</i>
                        <p style={{fontWeight:'bold',fontSize:'1rem',margin:'10px 0px 0px'}}>PRODUCT DESCRIPTION :</p>
                        <p style={{ marginBottom: "1rem" }}>{product.description}</p>
                    </div>
                    <div className="product-price">
                        <span style={{ fontSize: "2rem", fontWeight: "bold" }}>
                        {"$" + product.price}
                        </span>
                        <button
                            className={ !product.available ? "disabled-btn" : "cart-btn"}
                            onClick={handlAddToCart}
                            disabled={!product.available}
                            style={{
                                padding: "1rem 2rem",
                                fontSize: "1rem",
                                border: "none",
                                backgroundColor: product.available? "#28a745" : "#6c757d",
                                borderRadius: "5px",
                                cursor: product.available? "pointer" : "not-allowed",
                                marginBottom: "1rem",
                                fontWeight: "bold",
                            }}
                        >
                            {product.available ? "Add to cart" : "Out of Stock"}
                        </button>
                        <h6 style={{ marginBottom: "1rem" }}>
                            Stock Available: {
                                product.available
                                    ? <i style={{ color: "green"}}>Yes, {product.quantity} left.</i>
                                    : <i style={{ color: "red" }}>No</i>
                            }
                        </h6>

                    </div>
                    <div className="update-button" style={{ display: "flex", gap: "1rem" }}>
                        <button
                            className="btn btn-primary"
                            type="button"
                            onClick={handleEditClick}
                            style={{
                                padding: "1rem 2rem",
                                fontSize: "1rem",
                                backgroundColor: "#007bff",
                                color: "white",
                                border: "none",
                                borderRadius: "5px",
                                cursor: "pointer",
                            }}
                        >
                            Update
                        </button>
                        <button
                            className="btn btn-primary"
                            type="button"
                            onClick={deleteProduct}
                            style={{
                                padding: "1rem 2rem",
                                fontSize: "1rem",
                                backgroundColor: "#dc3545",
                                color: "white",
                                border: "none",
                                borderRadius: "5px",
                                cursor: "pointer",
                            }}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Product;
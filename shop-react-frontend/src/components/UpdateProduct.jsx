import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom"; // Importa useNavigate para la redirección

const UpdateProduct = () => {
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const navigate = useNavigate();
    const [updateProduct, setUpdateProduct] = useState({
        id: null,
        name: "",
        description: "",
        brand: "",
        price: "",
        category: "",
        date: "",
        available: false,
        quantity: "",
    });

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8080/api/product/${id}`
                );
                setProduct(response.data);
                setUpdateProduct(response.data);

            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };
        fetchProduct();
    }, [id]);

    const handleSubmit = async(e) => {
        e.preventDefault();
        const updatedProduct = new FormData();
        updatedProduct.append(
            "product",
            new Blob([JSON.stringify(updateProduct)], { type: "application/json" })
        );

        axios
            .put(`http://localhost:8080/api/product/${id}`, updatedProduct, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((response) => {
                console.log("Product updated successfully:", updatedProduct);
                alert("Product updated successfully!");
                navigate(`/product/${id}`);
            })
            .catch((error) => {
                console.error("Error updating product:", error);
                console.log("product unsuccessfull update",updateProduct)
                alert("Failed to update product. Please try again.");
            });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdateProduct({
            ...updateProduct,
            [name]: value,
        });
    };

    return (
        <div className="container" >
            <div className="center-container bg-primary bg-opacity-50 p-3 border border-5">
                <h1 className="text-center color-9 text-decoration-underline fw-bold">Update Product</h1>
                <br />
                <form className="row g-3 pt-1" onSubmit={handleSubmit}>
                    <div className="col-md-6">
                        <label className="form-label">
                            <h6>Name</h6>
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder={product.name}
                            value={updateProduct.name}
                            onChange={handleChange}
                            name="name"
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">
                            <h6>Brand</h6>
                        </label>
                        <input
                            type="text"
                            name="brand"
                            className="form-control"
                            placeholder={product.brand}
                            value={updateProduct.brand}
                            onChange={handleChange}
                            id="brand"
                        />
                    </div>
                    <div className="col-12">
                        <label className="form-label">
                            <h6>Description</h6>
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder={product.description}
                            name="description"
                            onChange={handleChange}
                            value={updateProduct.description}
                            id="description"
                        />
                    </div>
                    <div className="col-5">
                        <label className="form-label">
                            <h6>Price</h6>
                        </label>
                        <input
                            type="number"
                            className="form-control"
                            onChange={handleChange}
                            value={updateProduct.price}
                            placeholder={product.price}
                            name="price"
                            id="price"
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">
                            <h6>Category (Current: {updateProduct.category || 'N/A'})</h6>
                        </label>
                        <select
                            className="form-select"
                            value={updateProduct.category}

                            onChange={handleChange}
                            name="category"
                            id="category"
                        >
                            <option value="">Select category</option>
                            <option value="cars">Cars</option>
                            <option value="laptop">Laptop</option>
                            <option value="headphone">Headphone</option>
                            <option value="mobile">Mobile</option>
                            <option value="electronics">Electronics</option>
                            <option value="toys">Toys</option>
                            <option value="fashion">Fashion</option>
                        </select>
                    </div>

                    <div className="col-md-4">
                        <label className="form-label">
                            <h6>Stock Quantity</h6>
                        </label>
                        <input
                            type="number"
                            className="form-control"
                            onChange={handleChange}
                            placeholder={product.quantity}
                            value={updateProduct.quantity}
                            name="quantity"
                            id="quantity"
                        />
                    </div>
                    <div className="col-12">
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                name="available"
                                id="gridCheck"
                                checked={updateProduct.available}
                                onChange={(e) =>
                                    setUpdateProduct({ ...updateProduct, available: e.target.checked })
                                }
                            />
                            <label className="form-check-label">Product Available</label>
                        </div>
                    </div>

                    <div className="col-12 text-center">
                        <button
                            type="submit"
                            className="btn"
                            style={{backgroundColor: "#28a745", color: "white", padding: "15px"}}
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateProduct;
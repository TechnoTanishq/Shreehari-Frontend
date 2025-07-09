// src/utils/api.js

export const addToCart = async (product, quantity = 1) => {
    const token = localStorage.getItem("token");
    if (!token) {
        return { error: "Please login to add items to cart." };
    }

    try {
        const res = await fetch("http://localhost:3000/api/cart", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                productId: product._id || product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity,
            }),
        });




        const data = await res.json();
        if (!res.ok) throw new Error(data.msg || "Something went wrong");

        return { success: true, data };
    } catch (err) {
        return { error: err.message };
    }
};


// utils/api.js

export const getCartItems = async () => {
    const token = localStorage.getItem("token");
    if (!token) return { error: "Please login to view cart." };

    try {
        const res = await fetch("http://localhost:3000/api/cart", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.msg || "Failed to fetch cart");

        return { data };
    } catch (err) {
        return { error: err.message };
    }
};

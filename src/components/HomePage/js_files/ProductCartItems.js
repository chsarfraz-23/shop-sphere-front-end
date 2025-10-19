import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Trash2 } from "lucide-react";

const CartItems = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch cart items from API
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
          const response = await axios.get(`${process.env.REACT_APP_SHOPSPHERE_API_URL}/cart-product-items/`);
        setCartItems(response.data.results || []);
      } catch (err) {
        setError("Failed to load cart items.");
      } finally {
        setLoading(false);
      }
    };
    fetchCartItems();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin w-6 h-6 text-gray-500" />
        <span className="ml-2 text-gray-600">Loading cart items...</span>
      </div>
    );
  }

  if (error) {
    return <p className="text-red-600 text-center mt-10">{error}</p>;
  }

  if (cartItems.length === 0) {
    return <p className="text-gray-500 text-center mt-10">Your cart is empty.</p>;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">Your Cart</h1>

      <div className="space-y-4">
        {cartItems.map((item) => (
          <Card key={item.id} className="shadow-sm hover:shadow-md transition">
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="font-medium text-gray-800">Product ID: {item.product}</p>
                <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                <p className="text-sm text-gray-500">
                  Status: {item.is_ordered ? "Ordered" : "In Cart"}
                </p>
              </div>
              <Button variant="destructive" size="sm" className="flex items-center gap-1">
                <Trash2 className="w-4 h-4" /> Remove
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CartItems;

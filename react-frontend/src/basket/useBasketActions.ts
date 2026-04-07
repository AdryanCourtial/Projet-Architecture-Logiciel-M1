import { useState } from "react";
import { useNavigate } from "react-router";
import { getApiErrorMessage } from "../auth/auth.api";
import useAuth from "../auth/useAuth";
import { addToBasket } from "./basket.api";

function useBasketActions() {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const [isAdding, setIsAdding] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const addProduct = async (productId: number, quantity: number = 1) => {
        if (!isAuthenticated) {
            navigate("/login");
            return;
        }

        try {
            setIsAdding(true);
            setErrorMessage(null);
            await addToBasket({ productId, quantity });
            navigate("/cart");
        } catch (error) {
            setErrorMessage(getApiErrorMessage(error));
        } finally {
            setIsAdding(false);
        }
    };

    return {
        addProduct,
        isAdding,
        errorMessage,
    };
}

export default useBasketActions;

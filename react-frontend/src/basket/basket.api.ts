import { axiosClient } from "../shared/api/axiosClient";
import { mapBasketFromApi } from "./basket.mapper";
import type { Basket, BasketApi, BasketQuantityPayload } from "./basket.types";

export const getBasket = async (): Promise<Basket> => {
    const response = await axiosClient.get<BasketApi>("/basket");
    return mapBasketFromApi(response.data);
};

export const addToBasket = async (
    payload: BasketQuantityPayload,
): Promise<Basket> => {
    const response = await axiosClient.post<BasketApi>("/basket/add", payload);
    return mapBasketFromApi(response.data);
};

export const updateBasketQuantity = async (
    payload: BasketQuantityPayload,
): Promise<Basket> => {
    const response = await axiosClient.patch<BasketApi>(
        "/basket/update-quantity",
        payload,
    );
    return mapBasketFromApi(response.data);
};

export const removeFromBasket = async (productId: number): Promise<Basket> => {
    const response = await axiosClient.delete<BasketApi>(`/basket/remove/${productId}`);
    return mapBasketFromApi(response.data);
};

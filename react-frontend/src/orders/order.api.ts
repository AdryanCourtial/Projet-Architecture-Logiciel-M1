import { axiosClient } from "../shared/api/axiosClient";
import { mapOrderFromApi, mapUserOrderFromApi } from "./order.mapper";
import type {
  CreateOrderPayload,
  Order,
  OrderApi,
  UserOrder,
  UserOrderApi,
} from "./order.types";

export const createOrder = async (payload: CreateOrderPayload): Promise<Order> => {
  const response = await axiosClient.post<OrderApi>("/orders/create", payload);
  return mapOrderFromApi(response.data);
};

export const getUserOrders = async (): Promise<UserOrder[]> => {
  const response = await axiosClient.get<UserOrderApi[]>("/orders/user");
  return response.data.map(mapUserOrderFromApi);
};

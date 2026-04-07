import { useEffect, useState } from "react";
import { getApiErrorMessage } from "../auth/auth.api";
import { getProductCategories } from "./product.api";
import type { Category } from "./product.types";

function useProductCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setIsLoading(true);
        setErrorMessage(null);
        const data = await getProductCategories();
        setCategories(data);
      } catch (error) {
        setErrorMessage(getApiErrorMessage(error));
        setCategories([]);
      } finally {
        setIsLoading(false);
      }
    };

    void loadCategories();
  }, []);

  return {
    categories,
    isLoading,
    errorMessage,
  };
}

export default useProductCategories;

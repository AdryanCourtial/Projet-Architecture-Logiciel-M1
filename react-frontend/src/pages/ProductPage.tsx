import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import Button from "../components/Button";
import { getApiErrorMessage } from "../auth/auth.api";
import useAuth from "../auth/useAuth";
import { getProductById } from "../products/product.api";
import type { Product } from "../products/product.types";
import useBasketActions from "../basket/useBasketActions";
import {
  createProductReview,
  getProductReviewAverage,
  getProductReviews,
} from "../reviews/review.api";
import type { ProductReviewAverage, ReviewItem } from "../reviews/review.types";

const initialReviewForm = {
  rating: 5,
  title: "",
  comment: "",
};

function ProductPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { addProduct, isAdding, errorMessage: basketErrorMessage } = useBasketActions();
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [reviewAverage, setReviewAverage] = useState<ProductReviewAverage | null>(null);
  const [isLoadingReviews, setIsLoadingReviews] = useState(false);
  const [reviewErrorMessage, setReviewErrorMessage] = useState<string | null>(null);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [reviewForm, setReviewForm] = useState(initialReviewForm);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) {
        setErrorMessage("Product ID is missing");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setErrorMessage(null);
        const data = await getProductById(Number(id));
        setProduct(data);
      } catch (err) {
        setErrorMessage(
          err instanceof Error ? err.message : "Failed to load product"
        );
        setProduct(null);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchReviews = async () => {
      if (!id) {
        return;
      }

      try {
        setIsLoadingReviews(true);
        setReviewErrorMessage(null);

        const productId = Number(id);
        const [reviewsData, averageData] = await Promise.all([
          getProductReviews(productId),
          getProductReviewAverage(productId),
        ]);

        setReviews(reviewsData.items);
        setReviewAverage(averageData);
      } catch (error) {
        setReviewErrorMessage(getApiErrorMessage(error));
        setReviews([]);
        setReviewAverage(null);
      } finally {
        setIsLoadingReviews(false);
      }
    };

    void fetchProduct();
    void fetchReviews();
  }, [id]);

  const reloadReviews = async (productId: number) => {
    try {
      const [reviewsData, averageData] = await Promise.all([
        getProductReviews(productId),
        getProductReviewAverage(productId),
      ]);

      setReviews(reviewsData.items);
      setReviewAverage(averageData);
    } catch (error) {
      setReviewErrorMessage(getApiErrorMessage(error));
    }
  };

  const submitReview = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!id) {
      return;
    }

    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    try {
      setIsSubmittingReview(true);
      setReviewErrorMessage(null);

      await createProductReview(Number(id), {
        rating: reviewForm.rating,
        title: reviewForm.title.trim(),
        comment: reviewForm.comment.trim(),
      });

      setReviewForm(initialReviewForm);
      await reloadReviews(Number(id));
    } catch (error) {
      setReviewErrorMessage(getApiErrorMessage(error));
    } finally {
      setIsSubmittingReview(false);
    }
  };

  if (isLoading) {
    return (
      <section className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <p className="text-sm uppercase tracking-[0.14em] text-white/60">
          Loading product...
        </p>
      </section>
    );
  }

  if (!product || errorMessage) {
    return (
      <section className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <h1 className="text-3xl font-black uppercase">Product Not Found</h1>
        {errorMessage && (
          <p className="mt-4 text-sm text-red-300">{errorMessage}</p>
        )}
        <Link
          to="/shop"
          className="mt-6 inline-block text-xs font-bold uppercase tracking-[0.12em] text-acid"
        >
          Back to Shop
        </Link>
      </section>
    );
  }

  const imageUrl =
    product.image || "https://via.placeholder.com/600x600?text=No+Image";
  const categoryName = product.category?.name || "Uncategorized";
  const isInStock = product.stock > 0;

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div>
          <img
            src={imageUrl}
            alt={product.name}
            className="h-105 w-full border border-white/10 object-cover"
          />
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-acid">
            {categoryName}
          </p>
          <h1 className="mt-3 text-3xl font-black uppercase leading-tight sm:text-4xl">
            {product.name}
          </h1>
          <div className="mt-4 flex items-center gap-3">
            <p className="text-2xl font-black">{product.price.toFixed(2)} €</p>
            <span
              className={`text-xs font-bold uppercase tracking-[0.12em] ${
                isInStock ? "text-green-400" : "text-red-400"
              }`}
            >
              {isInStock ? `Stock: ${product.stock}` : "Out of Stock"}
            </span>
          </div>
          {reviewAverage && (
            <p className="mt-2 text-xs font-bold uppercase tracking-[0.12em] text-white/70">
              Rating: {reviewAverage.formattedAverage}/5 ({reviewAverage.count} reviews)
            </p>
          )}

          <div className="mt-8">
            <Button
              className="w-full sm:w-auto"
              disabled={!isInStock || isAdding}
              onClick={() => {
                void addProduct(product.id, 1);
              }}
            >
              {!isInStock ? "SOLD OUT" : isAdding ? "ADDING..." : "ADD TO CART"}
            </Button>
            {basketErrorMessage && (
              <p className="mt-3 text-xs font-bold uppercase tracking-[0.12em] text-red-300">
                {basketErrorMessage}
              </p>
            )}
          </div>

          <div className="mt-10 border-t border-white/10 pt-6">
            <h2 className="text-sm font-black uppercase tracking-[0.12em]">
              Description
            </h2>
            <p className="mt-3 max-w-xl text-sm text-white/75">
              {product.description}
            </p>
          </div>

          <div className="mt-10 border-t border-white/10 pt-6">
            <h2 className="text-sm font-black uppercase tracking-[0.12em]">
              Reviews
            </h2>

            <form onSubmit={submitReview} className="mt-4 space-y-3 border border-white/10 bg-black/30 p-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/70">
                Leave a review
              </p>

              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setReviewForm((current) => ({ ...current, rating: star }))}
                    className={`text-xl leading-none transition-colors ${
                      star <= reviewForm.rating ? "text-acid" : "text-white/30"
                    }`}
                    aria-label={`Set rating to ${star}`}
                  >
                    ★
                  </button>
                ))}
              </div>

              <input
                type="text"
                value={reviewForm.title}
                onChange={(event) =>
                  setReviewForm((current) => ({ ...current, title: event.target.value }))
                }
                placeholder="Review title"
                required
                disabled={isSubmittingReview}
                className="w-full border border-white/20 bg-transparent px-3 py-2 text-sm font-bold text-textPrimary outline-none transition-colors focus:border-acid"
              />

              <textarea
                value={reviewForm.comment}
                onChange={(event) =>
                  setReviewForm((current) => ({ ...current, comment: event.target.value }))
                }
                placeholder="Your review"
                required
                rows={3}
                disabled={isSubmittingReview}
                className="w-full resize-none border border-white/20 bg-transparent px-3 py-2 text-sm text-textPrimary outline-none transition-colors focus:border-acid"
              />

              <div className="flex justify-end">
                <Button type="submit" disabled={isSubmittingReview}>
                  {isSubmittingReview ? "Posting..." : "Post review"}
                </Button>
              </div>
            </form>

            {reviewErrorMessage && (
              <p className="mt-3 border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-red-300">
                {reviewErrorMessage}
              </p>
            )}

            {isLoadingReviews ? (
              <p className="mt-4 text-sm text-white/60">Loading reviews...</p>
            ) : reviews.length === 0 ? (
              <p className="mt-4 text-sm text-white/60">No reviews yet.</p>
            ) : (
              <div className="mt-4 space-y-3">
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className="border-l-2 border-acid/30 pl-3 text-sm"
                  >
                    <p className="font-bold uppercase text-white">{review.title}</p>
                    <p className="mt-1 text-sm text-white/70">{review.comment}</p>
                    <p className="text-xs text-white/50">
                      Rating: {review.rating}/5
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductPage;

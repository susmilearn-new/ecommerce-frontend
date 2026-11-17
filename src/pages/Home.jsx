import { useEffect, useState } from "react";
import {
  useDispatch,
  useSelector,
} from "react-redux";

import { fetchProducts } from "../redux/thunks/productThunks";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const dispatch = useDispatch();

  const {
    products,
    loading,
    error,
    total,
    pages,
    currentPage,
  } = useSelector(
    (state) => state.products
  );

  const [search, setSearch] =
    useState("");

  const [category, setCategory] =
    useState("");

  const [minPrice, setMinPrice] =
    useState("");

  const [maxPrice, setMaxPrice] =
    useState("");

  const [sort, setSort] =
    useState("");

  const [page, setPage] =
    useState(1);

  const limit = 8;

  // Fetch products
  const loadProducts = () => {
    const params = {
      page,
      limit,
    };

    if (search.trim()) {
      params.search =
        search.trim();
    }

    if (category) {
      params.category =
        category;
    }

    if (minPrice) {
      params.minPrice =
        minPrice;
    }

    if (maxPrice) {
      params.maxPrice =
        maxPrice;
    }

    if (sort) {
      params.sort = sort;
    }

    dispatch(
      fetchProducts(params)
    );
  };

  useEffect(() => {
    loadProducts();
  }, [
    page,
    category,
    sort,
  ]);

  // Search button
  const handleSearch = (e) => {
    e.preventDefault();

    setPage(1);

    const params = {
      page: 1,
      limit,
    };

    if (search.trim()) {
      params.search =
        search.trim();
    }

    if (category) {
      params.category =
        category;
    }

    if (minPrice) {
      params.minPrice =
        minPrice;
    }

    if (maxPrice) {
      params.maxPrice =
        maxPrice;
    }

    if (sort) {
      params.sort = sort;
    }

    dispatch(
      fetchProducts(params)
    );
  };

  // Apply price filter
  const handlePriceFilter =
    () => {
      setPage(1);

      const params = {
        page: 1,
        limit,
      };

      if (search.trim()) {
        params.search =
          search.trim();
      }

      if (category) {
        params.category =
          category;
      }

      if (minPrice) {
        params.minPrice =
          minPrice;
      }

      if (maxPrice) {
        params.maxPrice =
          maxPrice;
      }

      if (sort) {
        params.sort = sort;
      }

      dispatch(
        fetchProducts(params)
      );
    };

  // Clear all filters
  const clearFilters = () => {
    setSearch("");
    setCategory("");
    setMinPrice("");
    setMaxPrice("");
    setSort("");
    setPage(1);

    dispatch(
      fetchProducts({
        page: 1,
        limit,
      })
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Products
        </h1>

        <p className="text-gray-500 mt-2">
          Browse and discover our products
        </p>
      </div>

      {/* Search */}
      <form
        onSubmit={handleSearch}
        className="mb-6"
      >
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            placeholder="Search products..."
            className="flex-1 border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
          />

          <button
            type="submit"
            className="bg-black text-white px-6 py-3 rounded-lg"
          >
            Search
          </button>
        </div>
      </form>

      {/* Filters */}
      <div className="border rounded-xl p-4 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">

          {/* Category */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Category
            </label>

            <select
              value={category}
              onChange={(e) => {
                setCategory(
                  e.target.value
                );
                setPage(1);
              }}
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value="">
                All Categories
              </option>

              <option value="Electronics">
                Electronics
              </option>

              <option value="Fashion">
                Fashion
              </option>

              <option value="Beauty">
                Beauty
              </option>

              <option value="Home">
                Home
              </option>

              <option value="Sports">
                Sports
              </option>

              <option value="Books">
                Books
              </option>
            </select>
          </div>

          {/* Minimum price */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Min Price
            </label>

            <input
              type="number"
              min="0"
              value={minPrice}
              onChange={(e) =>
                setMinPrice(
                  e.target.value
                )
              }
              placeholder="Min price"
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          {/* Maximum price */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Max Price
            </label>

            <input
              type="number"
              min="0"
              value={maxPrice}
              onChange={(e) =>
                setMaxPrice(
                  e.target.value
                )
              }
              placeholder="Max price"
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          {/* Sorting */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Sort By
            </label>

            <select
              value={sort}
              onChange={(e) => {
                setSort(
                  e.target.value
                );
                setPage(1);
              }}
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value="">
                Default
              </option>

              <option value="price_asc">
                Price: Low to High
              </option>

              <option value="price_desc">
                Price: High to Low
              </option>

              <option value="rating">
                Highest Rated
              </option>

              <option value="newest">
                Newest
              </option>

              <option value="name">
                Name
              </option>
            </select>
          </div>

          {/* Price filter button */}
          <div className="flex items-end">
            <button
              type="button"
              onClick={
                handlePriceFilter
              }
              className="w-full border border-black rounded-lg px-4 py-2"
            >
              Apply Filters
            </button>
          </div>
        </div>

        {/* Clear */}
        <button
          type="button"
          onClick={
            clearFilters
          }
          className="mt-4 text-sm text-red-500 hover:underline"
        >
          Clear all filters
        </button>
      </div>

      {/* Results count */}
      {!loading && (
        <div className="flex justify-between items-center mb-5">
          <p className="text-gray-600">
            {total} product
            {total !== 1
              ? "s"
              : ""}{" "}
            found
          </p>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="text-center py-10">
          <p>
            Loading products...
          </p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="text-center py-10 text-red-500">
          {error}
        </div>
      )}

      {/* Products */}
      {!loading &&
        !error &&
        products.length ===
          0 && (
          <div className="text-center py-16">
            <h2 className="text-xl font-semibold">
              No products found
            </h2>

            <p className="text-gray-500 mt-2">
              Try changing your search or filters.
            </p>
          </div>
        )}

      {!loading &&
        products.length >
          0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map(
              (product) => (
                <ProductCard
                  key={
                    product._id
                  }
                  product={
                    product
                  }
                />
              )
            )}
          </div>
        )}

      {/* Pagination */}
      {!loading &&
        pages > 1 && (
          <div className="flex justify-center items-center gap-3 mt-10">

            <button
              disabled={
                page === 1
              }
              onClick={() =>
                setPage(
                  page - 1
                )
              }
              className="border rounded-lg px-4 py-2 disabled:opacity-40"
            >
              Previous
            </button>

            <span className="px-3">
              Page{" "}
              {currentPage}{" "}
              of{" "}
              {pages}
            </span>

            <button
              disabled={
                page ===
                pages
              }
              onClick={() =>
                setPage(
                  page + 1
                )
              }
              className="border rounded-lg px-4 py-2 disabled:opacity-40"
            >
              Next
            </button>
          </div>
        )}
    </div>
  );
};

export default Home;
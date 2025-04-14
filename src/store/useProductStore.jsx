import { create } from "zustand";

const useProductStore = create((set) => ({
  name: "",
  categoryId: "",
  categories: "",
  status: true,
  description: "",
  base_price: "",

  // Initialize with one default variant with specified defaults
  variants: [
    { name: "", price: "", stock: "", minimum_stock: "", track_stock: true }, // Use '1' for tracking stock
  ],

  setProduct: (product) =>
    set({
      name: product.name || "",
      categoryId: product.categoryId || "",
      categories: product.categories.name,
      status: product.status === 1, // ubah ke boolean
      description: product.description || "",
      base_price: product.base_price || 0,
      variants:
        product.variants?.map((v) => ({
          ...v,
          track_stock: v.track_stock === 1, // convert ke boolean
        })) || [],
    }),

  setVariants: (variants) => set({ variants }),

  // Setters
  setName: (name) => set({ name }),
  setCategoryId: (categoryId) => set({ categoryId }),
  setStatus: (status) => set({ status }),
  setDescription: (description) => set({ description }),
  setBasePrice: (base_price) => set({ base_price }),

  // Add Variant Method
  addVariant: () =>
    set((state) => ({
      variants: [
        ...state.variants,
        {
          name: "",
          price: state.base_price,
          stock: "",
          minimum_stock: "",
          track_stock: true,
        },
      ],
    })),

  // Remove Variant Method
  removeVariant: (index) =>
    set((state) => ({
      variants: state.variants.filter((_, i) => i !== index),
    })),

  // Update Variant Field Method
  updateVariantField: (index, field, value) => {
    if (["price", "stock", "minimum_stock"].includes(field)) {
      if (value === "" || Number(value) >= 0) {
        set((state) => ({
          variants: state.variants.map((v, i) =>
            i === index ? { ...v, [field]: value } : v
          ),
        }));
        return;
      }
    }

    if (field === "track_stock") {
      set((state) => ({
        variants: state.variants.map((v, i) =>
          i === index ? { ...v, track_stock: value } : v
        ),
      }));
      return;
    }

    // Default update
    set((state) => ({
      variants: state.variants.map((v, i) =>
        i === index ? { ...v, [field]: value } : v
      ),
    }));
  },

  resetForm: () =>
    set({
      name: "",
      categoryId: "",
      status: true,
      description: "",
      base_price: "",
      variants: [
        {
          name: "",
          price: "",
          stock: "",
          minimum_stock: "",
          track_stock: true,
        },
      ],
    }),
}));

export default useProductStore;

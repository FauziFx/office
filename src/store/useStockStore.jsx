import { create } from "zustand";
import axios from "axios";
import api from "@/utils/api";

const useStockStore = create((set) => ({
  products: [],
  selectedProduct: null,
  variants: [],
  note: "",

  setProducts: (products) => set({ products }),
  setVariants: (variants) => set({ variants }),

  setSelectedProduct: async (product) => {
    if (!product || !product.value) {
      // Kalau select dikosongkan, reset state saja
      set({ selectedProduct: null, variants: [] });
      return;
    }

    // Kalau ada value, lanjut fetch dan isi variant
    set({ selectedProduct: product });

    try {
      const res = await api.get(`/products/${product.value}`);
      const variantData = res.data.data.variants.map((v) => ({
        ...v,
        before_stock: v.stock,
        adjust: "",
        after_stock: v.stock,
      }));
      set({ variants: variantData });
    } catch (err) {
      console.error("Gagal ambil data varian:", err);
      set({ variants: [] });
    }
  },

  setNotes: (note) => set({ note }),

  setAdjustQty: (index, qty, type) =>
    set((state) => {
      const variants = [...state.variants];
      const adjust = qty;
      const after =
        type == "in"
          ? variants[index].before_stock + parseInt(adjust)
          : variants[index].before_stock - parseInt(adjust);
      variants[index].adjust = adjust;
      variants[index].after_stock = Number.isNaN(after)
        ? variants[index].stock
        : after;
      return { variants };
    }),

  setActualQty: (index, qty) =>
    set((state) => {
      const variants = [...state.variants];
      const actual = qty;
      const adjust = parseInt(actual) - variants[index].before_stock;
      variants[index].after_stock = actual;
      variants[index].adjust = Number.isNaN(adjust) ? "" : adjust;
      return { variants };
    }),

  resetForm: () =>
    set({
      products: [],
      selectedProduct: null,
      variants: [],
      note: "",
    }),
}));

export default useStockStore;

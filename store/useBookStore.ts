import { create } from 'zustand';

interface Ebook {
  id: number;
  title: string;
  author: string;
  price: number;
  imageUrl: string;
  isNew?: boolean;
  isBestSeller?: boolean;
}

interface BookStore {
  booksBuffer: Ebook[];
  windowIndex: number;
  currentPage: number;

  itemsPerView: number;
  setItemsPerView: (count: number) => void;

  fetchBooks: (page: number) => Promise<void>;

  next: () => void;
  prev: () => void;
}

export const useBookStore = create<BookStore>((set, get) => ({
  booksBuffer: [],
  windowIndex: 0,
  currentPage: 1,

  itemsPerView: 4,

  setItemsPerView: (count) => {
    const { booksBuffer, windowIndex } = get();

    const maxIndex = Math.max(
      0,
      booksBuffer.length - count
    );

    set({
      itemsPerView: count,
      windowIndex: Math.min(windowIndex, maxIndex),
    });
  },

  fetchBooks: async (page) => {
    const response = await fetch(
      `/api/featured-ebooks?page=${page}`
    );

    const data = await response.json();

    set({
      booksBuffer: data.data,
      windowIndex: 0,
      currentPage: page,
    });
  },

  next: () => {
    const {
      windowIndex,
      booksBuffer,
      itemsPerView,
    } = get();

    const maxIndex =
      booksBuffer.length - itemsPerView;

    if (windowIndex < maxIndex) {
      set({
        windowIndex: windowIndex + 1,
      });
    }
  },

  prev: () => {
    const { windowIndex } = get();

    if (windowIndex > 0) {
      set({
        windowIndex: windowIndex - 1,
      });
    }
  },
}));
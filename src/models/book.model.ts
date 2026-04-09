export interface Book {
  id: number;
  categoryId: number;
  title: string;
  imgUrl: number;
  author: string;
  isbn: string;
  pages: number;
  summary: string;
  price: number;
  pubDate: string;
  detail: string;
  contents: string;
  liked: boolean;
  totalLikes: number;
}

export interface BookDetail extends Book {
  categoryName: string;
  likes: number;
  liked: boolean;
}

export interface BookReviewItem {
  id: number;
  userName: string;
  content: string;
  createdAt: string;
  score: number;
}

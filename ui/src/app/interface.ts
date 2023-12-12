export interface Book {
  _id?: string;
  name: string;
  author: string;
  publishedDate?: string;
  pages?: number;
}
export interface User {
  _id?: string;
  userName: string;
  password: string;
  isAdmin?: boolean;
  token?: string;
}

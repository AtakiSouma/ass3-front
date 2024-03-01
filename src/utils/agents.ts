import { AxiosResponse } from "axios";
import apiJWT from "./api";
export interface PagingParam {
  page: number;
  limit: number;
  search: string;
}
export interface SlugParam {
  slug: string;
}
export interface CommentToOrchidParam {
  slug: string;
  author: string;
  comment: string;
  rating: number;
}
export interface OrchidParamCreation {
  name: string;
  category: string;
  background: string;
  image: string;
  isNatural: boolean;
  origin: string;
  price: number;
  rating: number;
}
export interface CommentParam {
  orchid_slug: string;
  user_id: string;
  comment: string;
}
export interface UserProfileParams {
  uid: string;
  username: string;
  avatar: string;
  phoneNumber: string;
  gender: string;
}
export interface UIDParams {
  uid: string;
}
const responseBody = (response: AxiosResponse) => response.data;
const requests = {
  get: <T>(url: string, params?: T) =>
    apiJWT.get(url, { params }).then(responseBody),
  post: <T>(url: string, body: T) => apiJWT.post(url, body).then(responseBody),
  put: <T>(url: string, body: T) => apiJWT.put(url, body).then(responseBody),
  del: <T>(url: string, params?: T) =>
    apiJWT.delete(url, { params }).then(responseBody),
};
const User = {
  getAllCustomer: (input: PagingParam) =>
  requests.post("/api/user/all-customer", {
    limit: input.limit,
    page: input.page,
    search: input.search,
  }),
  getOneUser: (input: UIDParams) =>
    requests.post("/api/user/get-one", {
      uid: input.uid,
    }),

  UpdateUserProfile: (input: UserProfileParams) =>
    requests.put("/api/user/update-profile", {
      uid: input.uid,
      username: input.username,
      avatar: input.avatar,
      phoneNumber: input.phoneNumber,
      gender: input.gender,
    }),
};
const Orchid = {
  deleteOrchid: (slug:string) => requests.del("api/orchid",{
    slug:slug
  }),
  createOrchid: (input: OrchidParamCreation) =>
    requests.post("/api/orchid/create", {
      name: input.name,
      category: input.category,
      background: input.background,
      image: input.image,
      isNatural: input.isNatural,
      origin: input.origin,
      price: input.price,
      rating: input.rating,
    }),
  getOneOrchid: (slug: string) =>
    requests.post("/api/orchid/get-one", {
      slug: slug,
    }),

  getAllOrchid: (input: PagingParam) =>
    requests.post("/api/orchid", {
      limit: input.limit,
      page: input.page,
      search: input.search,
    }),
  getAllOrchidWithoutPaging: () => requests.get("/api/orchid"),
  createNewComment: (input: CommentToOrchidParam) =>
    requests.put("/api/orchid/new-comment", {
      slug: input.slug,
      author: input.author,
      comment: input.comment,
      rating: input.rating,
    }),
};
const Category = {
  getAllCategory: (input: PagingParam) =>
    requests.post("/api/category", {
      limit: input.limit,
      page: input.page,
      search: input.search,
    }),
  getAllCategoryWithPaging: () => requests.get("/api/category"),
};
const Comment = {
  commentToOrchid: (input: CommentParam) =>
    requests.post("/api/comment", {
      orchid_slug: input.orchid_slug,
      user_id: input.user_id,
      comment: input.comment,
    }),
  getCommentInOrchid: (slug?: string) =>
    requests.post("/api/comment/inorchid", {
      slug: slug,
    }),
};
const agent = {
  Orchid,
  Category,
  User,
  Comment,
};

export default agent;

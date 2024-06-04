import { Category } from "./category"

export interface PostCreateInput {
    title: string,
    content: string,
    createdDate: Date,
    category: Category
}

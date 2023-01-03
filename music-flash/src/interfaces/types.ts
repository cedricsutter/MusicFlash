import IBlogData from "./blogentry";

export type BlogState = {
    blog: IBlogData[]
}

export type BlogAction = {
    type: string
    blog: IBlogData
}

export type DispatchType = (args: BlogAction) => BlogAction
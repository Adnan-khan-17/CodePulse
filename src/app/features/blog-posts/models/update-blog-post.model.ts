export interface UpdateBlogpostrequest{
    title: string,
    shortDescription: string,
    content: string,
    featuredImageUrl: string,
    urlHandle: string,
    publishedDate: Date,
    author: string,
    isVisible: boolean
}
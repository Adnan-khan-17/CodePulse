export interface Blogpost{
    id: number,
    title: string,
    shortDescription: string,
    content: string,
    featuredImageUrl: string,
    urlHandle: string,
    publishedDate: Date,
    author: string,
    isVisible: boolean
}
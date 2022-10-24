export default interface IBlogData {
    id?: string | null,
    title: string,
    text: string,
    likedBy: number | null,
    liked: Array<string | number>,
    published?: boolean,
    date: any,
    link: string,
    creatorMail: string | null | undefined,
    creatorUID: string | undefined
}

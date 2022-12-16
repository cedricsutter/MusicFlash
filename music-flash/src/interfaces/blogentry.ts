export default interface IBlogData {
    id?: string,
    title: string,
    text: string,
    likedBy: number,
    liked: Array<any>,
    published: boolean,
    date: any,
    link: string,
    creatorMail: string | null | undefined,
    creatorUID: string | undefined,
}

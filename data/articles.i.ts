export interface Articles {
    title: string;
    slug: string;
    body: string;
    createdAt: string;
    updatedAt: string;
    // tagList: unknown;
    description: string;
    author: Author;
    favorited: boolean;
    favoritesCount: number;
}
export interface Author {
    username: string;
    // bio: unknown;
    image: string;
    following: boolean;
}

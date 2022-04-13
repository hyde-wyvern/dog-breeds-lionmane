export interface Breed {
    name: string;
    subBreeds: SubBreed[];
    images: string[];
}

export interface SubBreed {
    name: string;
    images: string[];
}

export interface ApiResponse {
    message: object;
    status: string;
}

export type ApiElement = Breed | SubBreed;

type UnionToIntersection<Union> = (
    Union extends any ? (key: Union) => void : never
) extends (key: infer I) => void
    ? I
    : never;

export type FlattenUnion<T> = {
    [Key in keyof UnionToIntersection<T>]: Key extends keyof T
        ? T[Key] extends any[]
            ? T[Key]
            : T[Key] extends object
            ? FlattenUnion<T[Key]>
            : T[Key]
        : UnionToIntersection<T>[Key] | undefined;
};

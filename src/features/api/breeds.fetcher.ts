import { ApiElement, ApiResponse, Breed, SubBreed } from '../../types/breed';

function apiRequest<T>(url: string): Promise<T> {
    return fetch(url)
        .then((response) => response.json())
        .then((data) => data)
        .catch((error) => error);
}

function ParseApiElement(data: Object): ApiElement[] {
    if (Array.isArray(data)) return data.map((entry) => ParseSubBreed(entry));
    else return Object.entries(data).map((entry) => ParseBreed(entry));
}

function ParseBreed(data: [string, object]): Breed {
    const collection: string[] = Array.isArray(data[1]) ? data[1] : [data[1]];
    const subBreeds: SubBreed[] = collection.map((entry: string) =>
        ParseSubBreed(entry)
    );
    return { name: data[0], subBreeds: subBreeds, images: [] };
}

function ParseSubBreed(name: string): SubBreed {
    return { name: name, images: [] };
}

function ProvideImages(
    collection: ApiElement[],
    name: string = '',
    imageCount: number = 1
): Promise<ApiElement[]> {
    return Promise.all(
        collection.map(async (element) => {
            const imageUrl = await FetchApiImage(
                name.length > 0 ? name : element.name,
                name.length > 0 ? element.name : '',
                imageCount
            );
            return { ...element, images: imageUrl };
        })
    ).catch((error) => error);
}

export function FetchAllBreeds(
    includeImages: boolean = false
): Promise<Breed[]> {
    const request = apiRequest<ApiResponse>(
        'https://dog.ceo/api/breeds/list/all'
    )
        .then((response: ApiResponse) => ParseApiElement(response.message))
        .then(async (breeds: ApiElement[]) => {
            if (includeImages) return await ProvideImages(breeds);
            else return breeds;
        })
        .catch((error) => error);
    return request;
}

export function FetchBreed(
    breedName: string,
    includeImages: boolean = false,
    imageCount: number = 1
): Promise<Breed> {
    return apiRequest<ApiResponse>(
        `https://dog.ceo/api/breed/${breedName}/list`
    )
        .then((response: ApiResponse) =>
            ParseBreed([
                response.status === 'success' ? breedName : 'notFound',
                response.message,
            ])
        )
        .then(async (breed: Breed) => {
            if (breed.name !== 'notFound' && includeImages) {
                const subBreeds = await ProvideImages(
                    breed.subBreeds,
                    breed.name,
                    imageCount
                );
                return { ...breed, subBreeds: subBreeds };
            } else return breed;
        })
        .catch((error) => error);
}

export function FetchApiImage(
    breed: string,
    subBreed: string = '',
    count: number = 1
): Promise<string[]> {
    const url: string =
        subBreed.length > 1
            ? `https://dog.ceo/api/breed/${breed}/${subBreed}/images/random/${count}`
            : `https://dog.ceo/api/breed/${breed}/images/random/${count}`;
    return apiRequest<ApiResponse>(url)
        .then((response: ApiResponse) => {
            return response.message;
        })
        .catch((error) => error);
}

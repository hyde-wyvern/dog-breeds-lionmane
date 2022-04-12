import { Breed } from '../../types/breed';

export interface ApiResponse {
    message: object;
    status: string;
}

export function apiRequest<T>(url: string): Promise<T> {
    return fetch(url)
        .then((response) => response.json())
        .then((data) => data)
        .catch((error) => error);
}

export function fetchBreeds(): Promise<Breed[]> {
    const request = apiRequest<ApiResponse>(
        'https://dog.ceo/api/breeds/list/all'
    )
        .then((response: ApiResponse) => {
            return Object.entries(response.message).map((entry) => ({
                name: entry[0],
                subBreeds: entry[1],
            }));
        })
        .then(async (breeds: Breed[]) => {
            return await Promise.all(
                breeds.map(async (breed) => {
                    const imageUrl = await fetchBreedImage(breed.name);
                    return {
                        name: breed.name,
                        subBreeds: breed.subBreeds,
                        image: imageUrl,
                    };
                })
            );
        })
        .catch((error) => error);
    return request;
}

function fetchBreedImage(breed: string): Promise<string> {
    return apiRequest<ApiResponse>(
        `https://dog.ceo/api/breed/${breed}/images/random`
    )
        .then((response: ApiResponse) => response.message)
        .catch((error) => error);
}

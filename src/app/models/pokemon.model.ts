export interface Pokemon {
    id: number;
    name: string;
    url: string;  
}

export interface PokeResults {
    count: number;
    next: string;
    previous: string;
    results: Pokemon[];
}

export interface PokeResult {
    count: number;
    next: string;
    previous: string;
    results: Pokemon[];
}
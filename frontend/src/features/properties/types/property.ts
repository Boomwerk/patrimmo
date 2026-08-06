export interface Property {
    id: number;
    name: string;
    address: string;
    city: string;
    zipCode: string;
    country: string;
    type: string;
    surface: number;
    rooms: number;
    rentAmout: string;
    chargesAmount: string;
    description: string | null;
    isAvailable: boolean;
}




// login
export interface ILoginParams{
    email:string;
    password:string;
}

// register
export interface IRegisterParams{
    email:string;
    password:string;
    username:string;
    confirmPassword:string;
}

export interface ICreateOrchidParams{
    name: string;
    category: string;
    background: string;
    image: string;
    isNatural: boolean;
    origin: string;
    price: number;
    rating: number;
}
export type SignUpDTO = {
    name:string,
    email:string,
    password:string
}


export type SignInDTO = {
    email:string,
    password:string
}

export type SignUpDriverDTO = {
  name: string;
  email: string;
  password: string;
  vehicle: {
    color: string;
    plate: string;
    capacity: number;
    vehicleType: "car" | "motorcycle" | "auto";
  };
};

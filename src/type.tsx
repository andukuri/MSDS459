export type BikeData={
    brand: string;    
    model: string;
    category: string;
    subcategory: string;
    price: Float32List;
    currency: string;
    year: string;
    frame: string;
    wheels: string;
    travelfront: string;
    travelrear: string;
    fork: string;
    groupset: string;
    suspension: string;
    motor: string;
    battery: string;
    drivetrain: string;
    brakes: string;
    url: string;
  }

export type UserAskDataType={
  category: string
  category1: string
  subcategory:string
  suspension:string
  frame:string
}

export type Bike={
  id: string;
  brand: string;   
  category: string;
  subcategory: string;
  price: Float32List;
  currency: string;
  frame: string;
  wheels: string;
  travelfront: string;
  travelrear: string;
  fork: string;
  groupset: string;
  suspension: string;
  motor: string;
  battery: string;
  drivetrain: string;
  brakes: string;
  url: string;
}

export type Model=
{
  id: string;
  model: string
  year: string
  bikes: Bike[];
}

export type Subcategory=
{
  id: string;
  subcategory: string
  models: Model[];
}

export type Category=
{
  id: string;
  category: string
  subcategories: Subcategory[];
}

export type Brand=
{
  id: string;
  brand: string;
  categories:Category[]
}


export type BrandInfo={
  Brands:Brand[]
}


export type BikesInfo={
  Bikes:Bike[]
}

export type AllQueryVars={
  category: String
  category1:String
  subcategory: String
  frame: String
  suspension: String
}


  
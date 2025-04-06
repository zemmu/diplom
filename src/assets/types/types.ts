export interface IUserCreds {
  username: string
  password: string
}

export interface IUserData extends IUserCreds {
  id?: number
  email: string
}

export interface IMe {
  email: string
  id: number
  username: string
}


export interface IUserSecondaryData {
  gender: "male" | "female" | "other"
  birthDate: string
  walkingTime: number
}

export interface IUserPreferences {
  food: string[]
  interests: string[]
}

export interface IUser extends IUserData, IUserSecondaryData, IUserPreferences {}

export type TLocType = 'выставочные залы' | 'религиозные объекты' | 'сады и парки' | 
'памятники' | 'мосты' | 'природные объекты' | 'замки и крепости'

export interface ILocation {
  id?: string
  value?: number
  
  gtib_id: number
  name: string
  location_type: TLocType
  address: string
  work_time: string
  coords: number[]
  description: string
}

export interface IFilteredLocation {
  location_type: string
  locations: ILocation[]
}
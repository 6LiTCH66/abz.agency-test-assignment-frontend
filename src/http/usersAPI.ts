import axios, {AxiosError, AxiosRequestConfig} from "axios";


export interface User{
    id: number,
    name: string,
    email: string,
    phone: string,
    position: string,
    position_id: number,
    photo: string,
    createdAt: Date,
    updatedAt: Date,
}

interface Links{
    next_url: string | null,
    prev_url: string | null
}

export interface UserList{
    page: number,
    total_users: number,
    total_pages: number,
    count: number,
    links: Links,
    users: User[]
}

export interface Pagination{
    page: number;
    count: number;
}

export interface UserCreationForm{
    name: string,
    email: string,
    phone: string
    position_id: string
}


export const getUsers = async (pagination: Pagination):Promise<UserList> => {

    const config: AxiosRequestConfig = {
        params: {...pagination }
    };

    try{
        const users = await axios.get<UserList>(`https://abzagency-test-assignment-production.up.railway.app/api/v1/users`, config)
        return users.data

    }catch (err){
        console.error(err)
        throw err;
    }
}
interface Token{
    success: boolean,
    token: string
}

export const getToken = async () => {

    try{
        const users = await axios.get<Token>(`https://abzagency-test-assignment-production.up.railway.app/api/v1/token`)
        return users.data

    }catch (err){
        console.error(err)
        throw err;
    }
}

export interface Fails{
    name?: string[]
    email?: string[]
    phone?: string[]
    position_id?: string[]
    photo?: string[]
}

export interface UserErrors{
    success: boolean,
    message: string,
    fails?: Fails
}
export interface UserSuccess{
    success: boolean,
    user_id: number,
    message: string
}
export const createUser = async (formData: FormData):Promise<UserSuccess | UserErrors> => {

    try{
        const token = await getToken()

        const user = await axios.post<UserSuccess>(`https://abzagency-test-assignment-production.up.railway.app/api/v1/users`, formData, {
            withCredentials: true,
            headers: {
                'Content-Type': 'multipart/form-data',
                'Token': token.token

            },
        })
        return user.data

    }catch (error){
        const err = error as AxiosError

        return err.response?.data as UserErrors

    }

}
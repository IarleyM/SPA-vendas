import { Api } from "../apiConfig";
import { ApiException } from "../ApiException";

export interface IPagadores {
    payerId: number,
    name: string;
    phone: string;
}

const getAll = async (): Promise<IPagadores[] | ApiException> => {
    try{
        const UrlRelative = `/GetAllPayer`
        const { data } = await Api().get(UrlRelative);
        return data.payer;
    }catch (error) {
        return new ApiException("Erro ao buscar Pagador");
    }
}

const getById = async (id: number): Promise<IPagadores | ApiException> => {
    try {
        const { data } = await Api().get(`/GetAllPayer/${id}`);
        return data;
    } catch (error) {
        return new ApiException(`Erro ao buscar venda com ID ${id}`);
    }
}

const getByName = async (Name: string): Promise<IPagadores[]> => {
    try {
        const { data } = await Api().get(`/GetPayerByName?payerName=${encodeURIComponent(Name)}`);
        return data;
    } catch (error: any) {
        throw new ApiException(error.toString())
    }
};

const create = async (dataToCreate: Omit<IPagadores, 'id'>): Promise<IPagadores | ApiException> => {
    try {
        const { data } = await Api().post<any>('/payers', dataToCreate);
        return data;
    } catch (error) {
        return new ApiException("Erro ao criar venda");
    }
}

const update = async (id: number, dataToUpdate: IPagadores ): Promise <IPagadores | ApiException> => {
    try {
        const { data } = await Api().put(`/payers/${id}`, dataToUpdate);
        return data;
    } catch (error) {
        return new ApiException(`Erro ao atualizar venda com ID ${id}`);
    }
}

const remove = async (id: number): Promise<IPagadores | ApiException> => {
    try{
        const { data } = await Api().delete(`/payers/${id}`);
        return data;
    }catch (error) {
        return new ApiException(`Erro ao remover venda com ID ${id}`);
    }
 }

export const PagadorServices = {
    getAll,
    getById,
    getByName,
    create,
    update,
    remove
}
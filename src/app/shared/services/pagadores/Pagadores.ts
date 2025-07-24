import { Environment } from "../../environment";
import { Api } from "../apiConfig";
import { ApiException } from "../ApiException";

export interface IPagadores {
    id: number,
    name: string;
    unitValue: string;
    description?: string;
}

const getAll = async (page = 1): Promise<IPagadores[] | ApiException> => {
    try{
        const UrlRelative = `/payers?_paged=${page}&limit=${Environment.LIMITE_DE_LINHAS}`
        const { data } = await Api().get(UrlRelative);
        return data;
    }catch (error) {
        return new ApiException("Erro ao buscar Pagador");
    }
}

const getById = async (id: number): Promise<IPagadores | ApiException> => {
    try {
        const { data } = await Api().get(`/payers/${id}`);
        return data;
    } catch (error) {
        return new ApiException(`Erro ao buscar venda com ID ${id}`);
    }
}

const getByName = async (Name: string): Promise<IPagadores[] | ApiException> => {
    try {
        const { data } = await Api().get(`/payers?name=${encodeURIComponent(Name)}`);
        return data;
    } catch (error) {
        return new ApiException(`Erro ao buscar pelo nome ${Name}`);
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
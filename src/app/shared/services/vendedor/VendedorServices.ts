import { Environment } from "../../environment";
import { Api } from "../apiConfig";
import { ApiException } from "../ApiException";

export interface IVendedor {
    id: number,
    name: string;
    phone: string;
}

const getAll = async (page = 1): Promise<IVendedor[] | ApiException> => {
    try{
        const UrlRelative = `/sellers?_paged=${page}&limit=${Environment.LIMITE_DE_LINHAS}`
        const { data } = await Api().get(UrlRelative);
        return data;
    }catch (error) {
        return new ApiException("Erro ao buscar Vendedor");
    }
}

const getById = async (id: number): Promise<IVendedor | ApiException> => {
    try {
        const { data } = await Api().get(`/sellers/${id}`);
        return data;
    } catch (error) {
        return new ApiException(`Erro ao buscar venda com ID ${id}`);
    }
}

const getByName = async (Name: string): Promise<IVendedor[] | ApiException> => {
    try {
        const { data } = await Api().get(`/sellers?name=${encodeURIComponent(Name)}`);
        return data;
    } catch (error) {
        return new ApiException(`Erro ao buscar pelo nome ${Name}`);
    }
};

const create = async (dataToCreate: Omit<IVendedor, 'id'>): Promise<IVendedor | ApiException> => {
    try {
        const { data } = await Api().post<any>('/sellers', dataToCreate);
        return data;
    } catch (error) {
        return new ApiException("Erro ao criar venda");
    }
}

const update = async (id: number, dataToUpdate: IVendedor ): Promise <IVendedor | ApiException> => {
    try {
        const { data } = await Api().put(`/sellers/${id}`, dataToUpdate);
        return data;
    } catch (error) {
        return new ApiException(`Erro ao atualizar venda com ID ${id}`);
    }
}

const remove = async (id: number): Promise<IVendedor | ApiException> => {
    try{
        const { data } = await Api().delete(`/sellers/${id}`);
        return data;
    }catch (error) {
        return new ApiException(`Erro ao remover venda com ID ${id}`);
    }
 }

export const VendedorServices = {
    getAll,
    getById,
    getByName,
    create,
    update,
    remove
}
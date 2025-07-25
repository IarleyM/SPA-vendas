import { Environment } from "../../environment";
import { Api } from "../apiConfig";
import { ApiException } from "../ApiException";
import { VendedorServices } from "../vendedor/VendedorServices";

export interface IVendas {
    id: number,
    sellerId: number;
    isPayed: boolean;
    value: number;
    date: string;
    payerId: number;
}

const getAll = async (page = 1, filter = ''): Promise<IVendas[] | ApiException> => {
    try{
        const sellerName = await VendedorServices.getByName(filter)

        console.log(sellerName)
        const UrlRelative = `/sells?_paged=${page}&limit=${Environment.LIMITE_DE_LINHAS}&nomeCompleto_like=${filter}`
        const { data } = await Api().get(UrlRelative);
        return data;
    }catch (error) {
        return new ApiException("Erro ao buscar vendas");
    }
}

const getById = async (id: number): Promise<IVendas | ApiException> => {
    try {
        const { data } = await Api().get(`/sells/${id}`);
        return data;
    } catch (error) {
        return new ApiException(`Erro ao buscar venda com ID ${id}`);
    }
}

const create = async (dataToCreate: Omit<IVendas, 'id'>): Promise<IVendas | ApiException> => {
    try {
        const { data } = await Api().post<any>('/sells', dataToCreate);
        return data;
    } catch (error) {
        return new ApiException("Erro ao criar venda");
    }
}

const update = async (id: number, dataToUpdate: IVendas ): Promise <IVendas | ApiException> => {
    try {
        const { data } = await Api().put(`/sells/${id}`, dataToUpdate);
        return data;
    } catch (error) {
        return new ApiException(`Erro ao atualizar venda com ID ${id}`);
    }
}

const remove = async (id: number): Promise<IVendas | ApiException> => {
    try{
        const { data } = await Api().delete(`/sells/${id}`);
        return data;
    }catch (error) {
        return new ApiException(`Erro ao remover venda com ID ${id}`);
    }
 }

export const VendasServices = {
    getAll,
    getById,
    create,
    update,
    remove
}
import { Environment } from "../../environment";
import { Api } from "../apiConfig";
import { ApiException } from "../ApiException";
import { VendedorServices } from "../vendedor/VendedorServices";

export interface IVendas {
    sellId: number,
    sellerId: number;
    isPayed: boolean;
    value: number;
    date: string;
    payerId: number;
}

export interface IRequestCreateVenda {
    isPayed: boolean;
    value: number;
    date: string;
    payerId: number;
    sellerId: number;
    itemSells: {
        quantity: number;
        total: number;
        unitValue: number;
        productId: number;
    }[];
}
    

const getAll = async (page = 1, filter = ''): Promise<IVendas[] | ApiException> => {
    try{
        const UrlRelative = `/GetAllSells`
        const { data } = await Api().get(UrlRelative);
        console.log("Vendas", data)
        return Array.isArray(data.sell) ? data.sell : [];
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

const create = async (dataToCreate: Omit<IRequestCreateVenda, 'id'>): Promise<IRequestCreateVenda | ApiException> => {
    try {
        const { data } = await Api().post<any>('/AddNewSell', dataToCreate);
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
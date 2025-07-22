import { Api } from "../apiConfig";
import { ApiException } from "../ApiException";

export interface IVendas {
    id: number,
    sellerId: number;
    isPayed: boolean;
    value: number;
    date: string;
    payerId: number;
}

const getAll = async (): Promise<IVendas[] | ApiException> => {
    try{
        const { data } = await Api().get('/vendas');
        return data;
    }catch (error) {
        return new ApiException("Erro ao buscar vendas");
    }
}

const getById = async (id: number): Promise<IVendas | ApiException> => {
    try {
        const { data } = await Api().get(`/vendas/${id}`);
        return data;
    } catch (error) {
        return new ApiException(`Erro ao buscar venda com ID ${id}`);
    }
}

const create = async (dataToCreate: Omit<IVendas, 'id'>): Promise<IVendas | ApiException> => {
    try {
        const { data } = await Api().post<any>('/vendas', dataToCreate);
        return data;
    } catch (error) {
        return new ApiException("Erro ao criar venda");
    }
}

const update = async (id: number, dataToUpdate: IVendas ): Promise <IVendas | ApiException> => {
    try {
        const { data } = await Api().put(`/venda/${id}`, dataToUpdate);
        return data;
    } catch (error) {
        return new ApiException(`Erro ao atualizar venda com ID ${id}`);
    }
}

const remove = async (id: number): Promise<IVendas | ApiException> => {
    try{
        const { data } = await Api().delete(`/venda/${id}`);
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
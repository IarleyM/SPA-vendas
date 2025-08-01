import { Api } from "../apiConfig";
import { ApiException } from "../ApiException";

export interface IVendasDetalhes {
    id: number,
    sellId: number;
    sellerId: number;
    productList: [];
}

const getAll = async (): Promise<IVendasDetalhes[] | ApiException> => {
    try {
        const UrlRelative = `/GetAllSellDetails`
        const { data } = await Api().get(UrlRelative);
        return data.sellDetail;
    } catch (error) {
        return new ApiException("Erro ao buscar vendas");
    }
}

const getById = async (id: number): Promise<IVendasDetalhes | ApiException> => {
    try {
        const { data } = await Api().get(`/GetAllSellDetails/${id}`);
        return data;
    } catch (error) {
        return new ApiException(`Erro ao buscar venda com ID ${id}`);
    }
}

const create = async (dataToCreate: Omit<IVendasDetalhes, 'id'>): Promise<IVendasDetalhes | ApiException> => {
    try {
        const { data } = await Api().post<any>('/GetAllSellDetails', dataToCreate);
        return data;
    } catch (error) {
        return new ApiException("Erro ao criar venda");
    }
}

const update = async (id: number, dataToUpdate: IVendasDetalhes): Promise<IVendasDetalhes | ApiException> => {
    try {
        const { data } = await Api().put(`/GetAllSellDetails/${id}`, dataToUpdate);
        return data;
    } catch (error) {
        return new ApiException(`Erro ao atualizar venda com ID ${id}`);
    }
}

const remove = async (id: number): Promise<IVendasDetalhes | ApiException> => {
    try {
        const { data } = await Api().delete(`/GetAllSellDetails/${id}`);
        return data;
    } catch (error) {
        return new ApiException(`Erro ao remover venda com ID ${id}`);
    }
}

export const DetalhesVendasServices = {
    getAll,
    getById,
    create,
    update,
    remove
}
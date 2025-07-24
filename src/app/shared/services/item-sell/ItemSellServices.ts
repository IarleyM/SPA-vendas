import { Environment } from "../../environment";
import { ApiException } from "../ApiException";
import { Api } from "../apiConfig";

export interface IItemSell{
    id: number,
    quantity: number,
    total: number,
    productId: number,
    sellId: number
}

const getAll = async (page = 1): Promise<IItemSell[] | ApiException> => {
    try{
        const UrlRelative = `/itemSell?_paged=${page}&limit=${Environment.LIMITE_DE_LINHAS}`
        const { data } = await Api().get(UrlRelative);
        return data;
    }catch (error) {
        return new ApiException("Erro ao buscar Item de Venda");
    }
}

const create = async (dataToCreate: Omit<IItemSell, 'id'>): Promise<IItemSell | ApiException> => {
    try {
        const { data } = await Api().post<any>('/itemSell', dataToCreate);
        return data;
    } catch (error) {
        return new ApiException("Erro ao criar venda");
    }
}

export const ItemSellServices = {
    getAll,
    create
} 
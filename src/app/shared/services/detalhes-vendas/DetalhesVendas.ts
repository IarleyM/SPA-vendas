import { Environment } from "../../environment";
import { Api } from "../apiConfig";
import { ApiException } from "../ApiException";
import { VendedorServices } from "../vendedor/VendedorServices";

export interface IVendasDetalhes {
    id: number,
    sellId: number;
    sellerId: number;
    productList: [];
}

const getAll = async (page = 1, filter = ''): Promise<IVendasDetalhes[] | ApiException> => {
    try{
        const sellerName = await VendedorServices.getByName(filter)

        console.log(sellerName)
        const UrlRelative = `/sellsDetail?_paged=${page}&limit=${Environment.LIMITE_DE_LINHAS}&nomeCompleto_like=${filter}`
        const { data } = await Api().get(UrlRelative);
        return data;
    }catch (error) {
        return new ApiException("Erro ao buscar vendas");
    }
}

const getById = async (id: number): Promise<IVendasDetalhes | ApiException> => {
    try {
        const { data } = await Api().get(`/sellsDetail/${id}`);
        return data;
    } catch (error) {
        return new ApiException(`Erro ao buscar venda com ID ${id}`);
    }
}

const create = async (dataToCreate: Omit<IVendasDetalhes, 'id'>): Promise<IVendasDetalhes | ApiException> => {
    try {
        const { data } = await Api().post<any>('/sellsDetail', dataToCreate);
        return data;
    } catch (error) {
        return new ApiException("Erro ao criar venda");
    }
}

const update = async (id: number, dataToUpdate: IVendasDetalhes ): Promise <IVendasDetalhes | ApiException> => {
    try {
        const { data } = await Api().put(`/sellsDetail/${id}`, dataToUpdate);
        return data;
    } catch (error) {
        return new ApiException(`Erro ao atualizar venda com ID ${id}`);
    }
}

const remove = async (id: number): Promise<IVendasDetalhes | ApiException> => {
    try{
        const { data } = await Api().delete(`/sellsDetail/${id}`);
        return data;
    }catch (error) {
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
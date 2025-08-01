import { Environment } from "../../environment";
import { Api } from "../apiConfig";
import { ApiException } from "../ApiException";

export interface IProdutos {
    productId: number,
    name: string;
    unitValue: string;
    description?: string;
}

const getAll = async (): Promise<IProdutos[] | ApiException> => {
    try{
        const UrlRelative = `/GetAllProduct`
        const { data } = await Api().get(UrlRelative);
        return data.products;
    }catch (error) {
        return new ApiException("Erro ao buscar Pagador");
    }
}

const GetProductBySell = async (id: number): Promise<IProdutos[] | ApiException> => {
    try{
        const UrlRelative = `/GetProductBySellId/${id}`
        const { data } = await Api().get(UrlRelative);
        return data;
    }catch (error){
        return new ApiException("Erro ao buscar Produtos Comprados")
    }
}

const getById = async (id: number): Promise<IProdutos | ApiException> => {
    try {
        const { data } = await Api().get(`/products/${id}`);
        return data;
    } catch (error) {
        return new ApiException(`Erro ao buscar venda com ID ${id}`);
    }
}

const getByName = async (Name: string): Promise<IProdutos[] | ApiException> => {
    try {
        const { data } = await Api().get(`/products?name=${encodeURIComponent(Name)}`);
        return data;
    } catch (error) {
        return new ApiException(`Erro ao buscar pelo nome ${Name}`);
    }
};

const create = async (dataToCreate: Omit<IProdutos, 'id'>): Promise<IProdutos | ApiException> => {
    try {
        const { data } = await Api().post<any>('/products', dataToCreate);
        return data;
    } catch (error) {
        return new ApiException("Erro ao criar venda");
    }
}

const update = async (id: number, dataToUpdate: IProdutos ): Promise <IProdutos | ApiException> => {
    try {
        const { data } = await Api().put(`/products/${id}`, dataToUpdate);
        return data;
    } catch (error) {
        return new ApiException(`Erro ao atualizar venda com ID ${id}`);
    }
}

const remove = async (id: number): Promise<IProdutos | ApiException> => {
    try{
        const { data } = await Api().delete(`/products/${id}`);
        return data;
    }catch (error) {
        return new ApiException(`Erro ao remover venda com ID ${id}`);
    }
 }

export const ProdutosServices = {
    getAll,
    getById,
    getByName,
    GetProductBySell,
    create,
    update,
    remove
}
import { Api } from "../apiConfig";
import { ApiException } from "../ApiException";

export interface ITarefa {
    id: number,
    title: string;
    isCompleted?: boolean;
}

const getAll = async (): Promise<ITarefa[] | ApiException> => {
    try{
        const { data } = await Api().get('/tarefas');
        return data;
    }catch (error) {
        return new ApiException("Erro ao buscar tarefas");
    }
}

const getById = async (id: number): Promise<ITarefa | ApiException> => {
    try {
        const { data } = await Api().get(`/tarefas/${id}`);
        return data;
    } catch (error) {
        return new ApiException(`Erro ao buscar tarefa com ID ${id}`);
    }
}

const create = async (dataToCreate: Omit<ITarefa, 'id'>): Promise<ITarefa | ApiException> => {
    try {
        const { data } = await Api().post<any>('/tarefas', dataToCreate);
        return data;
    } catch (error) {
        return new ApiException("Erro ao criar tarefa");
    }
}

const update = async (id: number, dataToUpdate: ITarefa ): Promise <ITarefa | ApiException> => {
    try {
        const { data } = await Api().put(`/tarefas/${id}`, dataToUpdate);
        return data;
    } catch (error) {
        return new ApiException(`Erro ao atualizar tarefa com ID ${id}`);
    }
}

const remove = async (id: number): Promise<ITarefa | ApiException> => {
    try{
        const { data } = await Api().delete(`/tarefas/${id}`);
        return data;
    }catch (error) {
        return new ApiException(`Erro ao remover tarefa com ID ${id}`);
    }
 }

export const TarefasServices = {
    getAll,
    getById,
    create,
    update,
    remove
}
'use server';
import { revalidatePath } from "next/cache";

export const refreshPage = async (path) => {
    revalidatePath(path);
}
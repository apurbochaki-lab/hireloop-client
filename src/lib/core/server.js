import { getUserToken } from "./session";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";

// Insert token to the header
export const authHeader = async () => {
    const token = await getUserToken();
    if (!token) return;
    const header = {
        authorization: `Bearer ${token}`
    };
    return header || {};
}

// post method for save to database
export const serverMutation = async (path, data, method = 'POST') => {
    const res = await fetch(`${baseUrl}${path}`, {
        method: method,
        headers: {
            "Content-Type": "application/json",
            ...await authHeader()
        },
        body: JSON.stringify(data)
    });

    return res.json();
}

// get method to retrieve data from the database
export const serverFetch = async (path) => {
    const res = await fetch(`${baseUrl}${path}`);
    return res.json();
}


// Protected fetch (JWT Verification)
export const protectedFetch = async (path) => {
    const res = await fetch(`${baseUrl}${path}`, {
        headers: await authHeader()
    });

    return res.json();
}
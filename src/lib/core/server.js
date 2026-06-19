const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";

// post method for save to database
export const serverMutation = async (path, data) => {
    const res = await fetch(`${baseUrl}${path}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
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

import { apiBase } from "../../components/constants";

/**
 * Make request to api to try to get a JWT for certain api routes
 * @param password password to check
 */
export const login = async (password: string) => {
    try {
        const res = await fetch(`${apiBase}/auth/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(password)
        });

        if (res.ok) {
            return await res.json();
        } else {
            console.error(res)
            throw new Error(JSON.stringify(res.body));
        }
    } catch (e) {
        console.error("Could not create login because of " + JSON.stringify(e));
        throw new Error(JSON.stringify(e));
    }
}
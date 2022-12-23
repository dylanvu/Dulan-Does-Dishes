
import { apiBase } from "../../components/constants";

/**
 * Make request to api to try to get a JWT for certain api routes
 * @param password password to check
 */
export const login = async (password: string) => {
    try {
        const stringifiedJSON = JSON.stringify(password);
        const res = await fetch(`${apiBase}/auth/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: stringifiedJSON
        });
        if (res.ok) {
            return await res.json();
        } else {
            console.error("Could not log in")
            const errorJSON = await res.json();
            console.error(errorJSON);
            throw new Error(JSON.stringify(errorJSON));
        }
    } catch (e) {
        if (e instanceof Error) {
            const error = e.message;
            console.error("Could not create login because of \"" + error + "\" error ");
            throw error;
        } else {
            console.error("Something not an error was thrown");
            throw new Error(JSON.stringify(e));
        }
    }
}
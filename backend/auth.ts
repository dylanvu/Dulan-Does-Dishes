import jwt, { JwtPayload } from 'jsonwebtoken';

export function generateJWT(payload: string): string | null {
    const secretKey: string | undefined = process.env.JWT_SECRET_KEY;
    if (secretKey) {
        // do not expire the jwt
        const JWT_TOKEN = jwt.sign(payload, secretKey)
        return JWT_TOKEN;
    } else {
        console.error("Secret key was not found! No JWT generated!");
        return null;
    }
}

export function verifyJWT(jwtToken: string): JwtPayload | string | null {
    // JWT Throws an error if the signature is invalid, so do a try catch
    // If the JWT is valid, it returns an JWT object with the payload, iat, and exp
    const secretKey: string | undefined = process.env.JWT_SECRET_KEY;
    if (secretKey) {
        try {
            const verify = jwt.verify(jwtToken, secretKey)
            return verify;
        } catch (e) {
            if (e instanceof Error) {
                console.error(e.message)
                return null;
            }
        }
        console.error("Error in jwt verify");
        return null;
    } else {
        console.error("Secret key was not found! Could not verify JWT");
        return null;
    }
}
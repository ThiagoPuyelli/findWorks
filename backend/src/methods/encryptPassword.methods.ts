import bcrypt, { genSaltSync } from "bcryptjs";

export default async (password: string): Promise<string> => {
    return await bcrypt.hash(password, genSaltSync(10));
}
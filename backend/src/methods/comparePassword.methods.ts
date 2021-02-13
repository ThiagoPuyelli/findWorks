import bcrypt from "bcryptjs";

export default async (password: string, realPassword: string): Promise<boolean> => {
    return await bcrypt.compare(password, realPassword); 
} 
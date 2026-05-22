import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req) {
    try {
        const body = await req.json();

        const { name, email, password, address } = body;

        const existingUser = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (existingUser) {
            return Response.json(
                {
                    message: "Email already exists",
                },
                {
                    status: 400,
                },
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                address,
            },
        });

        return Response.json(user);
    } catch (error) {
        return Response.json(
            {
                message: "Signup failed",
            },
            {
                status: 500,
            },
        );
    }
}

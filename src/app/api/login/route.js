import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req) {
    try {
        const body = await req.json();

        const { email, password } = body;

        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (!user) {
            return Response.json(
                {
                    message: "User not found",
                },
                {
                    status: 404,
                },
            );
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return Response.json(
                {
                    message: "Invalid credentials",
                },
                {
                    status: 400,
                },
            );
        }

        const token = jwt.sign(
            {
                id: user.id,
                role: user.role,
            },
            process.env.JWT_SECRET,
        );

        return Response.json({
            token,
            user,
        });
    } catch (error) {
        return Response.json(
            {
                message: "Login failed",
            },
            {
                status: 500,
            },
        );
    }
}

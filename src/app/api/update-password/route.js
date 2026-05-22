import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export async function POST(req) {
    try {
        const token = req.headers.get("authorization");

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const body = await req.json();

        const { password } = body;

        const hashedPassword = await bcrypt.hash(password, 10);

        await prisma.user.update({
            where: {
                id: decoded.id,
            },
            data: {
                password: hashedPassword,
            },
        });

        return Response.json({
            message: "Password updated successfully",
        });
    } catch (error) {
        return Response.json(
            {
                message: "Password update failed",
            },
            {
                status: 500,
            },
        );
    }
}

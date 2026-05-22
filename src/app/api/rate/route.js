import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

export async function POST(req) {
    try {
        const token = req.headers.get("authorization");

        if (!token) {
            return Response.json(
                {
                    message: "No token found",
                },
                {
                    status: 401,
                },
            );
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const body = await req.json();

        const { storeId, rating } = body;

        const existingRating = await prisma.rating.findFirst({
            where: {
                userId: decoded.id,
                storeId,
            },
        });

        if (existingRating) {
            await prisma.rating.update({
                where: {
                    id: existingRating.id,
                },
                data: {
                    rating,
                },
            });

            return Response.json({
                message: "Rating updated",
            });
        }

        await prisma.rating.create({
            data: {
                rating,
                storeId,
                userId: decoded.id,
            },
        });

        return Response.json({
            message: "Rating submitted",
        });
    } catch (error) {
        return Response.json(
            {
                message: "Rating failed",
            },
            {
                status: 500,
            },
        );
    }
}

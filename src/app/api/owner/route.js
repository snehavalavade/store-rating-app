import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

export async function GET(req) {
    try {
        const token = req.headers.get("authorization");

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const store = await prisma.store.findFirst({
            where: {
                ownerId: decoded.id,
            },
            include: {
                ratings: {
                    include: {
                        user: true,
                    },
                },
            },
        });

        if (!store) {
            return Response.json(
                {
                    message: "Store not found",
                },
                {
                    status: 404,
                },
            );
        }

        const total = store.ratings.reduce((sum, item) => sum + item.rating, 0);

        const average =
            store.ratings.length > 0
                ? (total / store.ratings.length).toFixed(1)
                : 0;

        return Response.json({
            storeName: store.name,
            averageRating: average,
            ratings: store.ratings,
        });
    } catch (error) {
        return Response.json(
            {
                message: "Failed to load owner dashboard",
            },
            {
                status: 500,
            },
        );
    }
}

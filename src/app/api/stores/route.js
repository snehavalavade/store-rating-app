import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

export async function GET(req) {
    try {
        const token = req.headers.get("authorization");

        let userId = null;

        if (token) {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            userId = decoded.id;
        }

        const stores = await prisma.store.findMany({
            include: {
                ratings: true,
            },
        });

        const formattedStores = stores.map((store) => {
            const total = store.ratings.reduce(
                (sum, item) => sum + item.rating,
                0,
            );

            const average =
                store.ratings.length > 0
                    ? (total / store.ratings.length).toFixed(1)
                    : 0;

            const userRating = store.ratings.find(
                (item) => item.userId === userId,
            );

            return {
                ...store,
                averageRating: average,
                userSubmittedRating: userRating?.rating || null,
            };
        });

        return Response.json(formattedStores);
    } catch (error) {
        return Response.json(
            {
                message: "Failed to fetch stores",
            },
            {
                status: 500,
            },
        );
    }
}

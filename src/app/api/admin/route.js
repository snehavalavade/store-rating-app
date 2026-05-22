import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const totalUsers = await prisma.user.count();

        const totalStores = await prisma.store.count();

        const totalRatings = await prisma.rating.count();

        const users = await prisma.user.findMany();

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

            return {
                ...store,
                averageRating: average,
            };
        });

        return Response.json({
            totalUsers,
            totalStores,
            totalRatings,
            users,
            stores: formattedStores,
        });
    } catch (error) {
        return Response.json(
            {
                message: "Failed to load dashboard",
            },
            {
                status: 500,
            },
        );
    }
}

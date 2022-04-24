import { createClient } from "redis";

export const createGraph = () => {
    const client = createClient({
        url: process.env['REDIS_URL'],
        socket: { keepAlive: false }
    });
    if (!client.isOpen) {
        client.connect();
    }
    return {
        query: async (q: string) => {
            const r = await client.graph.query('code-build', q);
            await client.quit();
            return r;
        }
    };
};

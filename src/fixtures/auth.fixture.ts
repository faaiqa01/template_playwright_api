export interface DummyJsonLoginPayload {
    readonly username: string;
    readonly password: string;
    readonly expiresInMins: number;
}

export const dummyJsonLoginFixture: DummyJsonLoginPayload = {
    username: process.env.DUMMYJSON_USERNAME ?? 'emilys',
    password: process.env.DUMMYJSON_PASSWORD ?? 'emilyspass',
    expiresInMins: Number(process.env.DUMMYJSON_EXPIRES_IN_MINS ?? 30),
};

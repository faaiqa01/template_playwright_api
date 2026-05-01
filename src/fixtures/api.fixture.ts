export interface NewPostPayload {
    readonly title: string;
    readonly body: string;
    readonly userId: number;
}

export const buildPostPayload = (overrides: Partial<NewPostPayload> = {}): NewPostPayload => {
    return {
        title: overrides.title ?? 'playwright-api-template-post',
        body: overrides.body ?? 'post body from playwright api test',
        userId: overrides.userId ?? 1,
    };
};

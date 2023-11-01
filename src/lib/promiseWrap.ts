export const wrapInObject = (promise: any) => {
    return Promise.allSettled([promise])
        .then(([result]) => {
            if (result.status === 'fulfilled') return {data: result.value, error: undefined}
            return {data: undefined, error: result.reason}
        });
}
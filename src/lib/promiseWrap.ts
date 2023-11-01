export const wrapInObject = <T>(promise: any) => {
  return Promise.allSettled([promise]).then(([result]) => {
    if (result.status === "fulfilled")
      return { data: result.value as T, error: undefined };
    return { data: undefined, error: result.reason };
  });
};

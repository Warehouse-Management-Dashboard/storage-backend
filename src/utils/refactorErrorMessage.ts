export const refactorErrorMessage = (err: any) => {
  let errors: Record<string, string> = {};
  err.inner.forEach((err: any) => {
    if (!errors[err.path]) errors[err.path] = err.message;
  });
  return errors;
};

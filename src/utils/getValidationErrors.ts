
export const getValidationErrors = (values?: any, errors?: any) => {
  return Object.keys(values).map((item) => {
    const errorMessage =
      errors.find((err: any) => err.param === item)?.msg || undefined;

    return {
      name: item,
      value: values[item],
      errors: errorMessage ? [errorMessage] : undefined
    };
  });
};

export const getErrorMessage = (error: any) => {
  if (error) {
    if ('status' in error) {
      // you can access all properties of `FetchBaseQueryError` here
      return 'error' in error ? error.error : JSON.stringify(error.data);
    } else {
      // you can access all properties of `SerializedError` here
      return error.message;
    }
  } else {
    return '';
  }
};

export const getApiUrl = () => {
  if(process.env.NODE_ENV === 'production') {
    return process.env.REACT_APP_API_URL;
  }
  return process.env.REACT_APP_LOCAL_URL;
}

export const API_URL = getApiUrl();

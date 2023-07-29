export const authHeader = (token?: string) => {
  if (!token) {
    return undefined;
  }

  return {
    Authorization: `Bearer ${token}`,
  };
};

export const toJSON = async (res: Response) => {
  try {
    const data = await res.json();
    return data;
  } catch {
    console.error('Error convert to json');
    return undefined;
  }
};

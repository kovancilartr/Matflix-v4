export const fetchUsers = async () => {
  try {
    const response = await fetch("/api/users");
    const data = await response.json();

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

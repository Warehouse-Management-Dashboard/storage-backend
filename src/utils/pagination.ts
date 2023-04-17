export const pagination = (query: any) => {
    const limit = Number(query.limit) || 10;
    const offset = Number(query.offset) || 0;
    const currentPage = offset / limit + 1;
  
    return {
      limit,
      offset,
      currentPage,
    };
  };
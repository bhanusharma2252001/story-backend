const paginateDBQueries = (data, totalCount) => {
  return {
    total: totalCount,
    total_pages: Math.ceil(totalCount / 20),
    perPageItems: 20,
    data: data,
  };
};
module.exports = {
  paginateDBQueries,
};

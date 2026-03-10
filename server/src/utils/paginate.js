export const paginate = async (model, query = {}, options = {}) => {
  const {
    page = 1,
    limit = 10,
    sortBy = 'createdAt',
    sortOrder = 'desc',
    lean = true,
  } = options;

  const skip = (page - 1) * limit;
  
  const queryModel = model.find(query);
  
  const [data, total] = await Promise.all([
    queryModel
      .sort({ [sortBy]: sortOrder === 'desc' ? -1 : 1 })
      .skip(skip)
      .limit(limit)
      .lean(lean),
    model.countDocuments(query),
  ]);

  const totalPages = Math.ceil(total / limit);
  const hasNext = page < totalPages;
  const hasPrev = page > 1;

  return {
    data,
    pagination: {
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages,
      hasNext,
      hasPrev,
    },
  };
};

export const cursorPaginate = async (model, query = {}, options = {}) => {
  const {
    cursor = null,
    limit = 10,
    sortBy = 'createdAt',
    sortOrder = 'desc',
    lean = true,
  } = options;

  const sortDirection = sortOrder === 'desc' ? -1 : 1;
  
  let cursorQuery = { ...query };
  
  if (cursor) {
    cursorQuery = {
      ...query,
      [sortBy]: { 
        [sortDirection === 1 ? '$gt' : '$lt']: cursor 
      },
    };
  }

  const data = await model
    .find(cursorQuery)
    .sort({ [sortBy]: sortDirection })
    .limit(limit + 1)
    .lean(lean);

  let hasNext = false;
  if (data.length > limit) {
    data.pop();
    hasNext = true;
  }

  const nextCursor = data.length > 0 ? data[data.length - 1][sortBy] : null;

  return {
    data,
    pagination: {
      limit: Number(limit),
      hasNext,
      nextCursor,
    },
  };
};

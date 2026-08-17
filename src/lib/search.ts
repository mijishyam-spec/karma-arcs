export type SearchFilters = {
  query?: string;
  status?: string;
  projectId?: string;
  clientId?: string;
  userId?: string;
  dateFrom?: Date;
  dateTo?: Date;
};

export function buildTextSearch(query?: string) {
  if (!query?.trim()) {
    return undefined;
  }

  return query.trim();
}

export function buildDateRange(dateFrom?: Date, dateTo?: Date) {
  if (!dateFrom && !dateTo) {
    return undefined;
  }

  return {
    ...(dateFrom ? { gte: dateFrom } : {}),
    ...(dateTo ? { lte: dateTo } : {}),
  };
}

export function normalizeFilters(filters: SearchFilters) {
  return {
    query: buildTextSearch(filters.query),
    status: filters.status?.trim() || undefined,
    projectId: filters.projectId,
    clientId: filters.clientId,
    userId: filters.userId,
    dateRange: buildDateRange(filters.dateFrom, filters.dateTo),
  };
}

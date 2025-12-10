const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://34.177.94.156";

export const config = {
  api: {
    baseUrl: API_BASE_URL,
    forms: `${API_BASE_URL}/webhook-test/forms`,
  },
};

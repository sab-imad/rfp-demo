const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://34.177.94.156/webhook";

const WebHookId = process.env.WEBHOOK_ID || '31259f3d-6afd-491d-bd85-b84240c3624e'

export const config = {
    api: {
        baseUrl: API_BASE_URL,
        forms: `${API_BASE_URL}/forms`,
        submitForm: (formId: string) => `${API_BASE_URL}/8fb5e7f4-e3e1-46fa-b3bc-97184b3c88bb/forms/${formId}/submit`,
        webhookId: WebHookId,
        getByIdOrDelete: `${API_BASE_URL}/${WebHookId}/forms`,
        getResponses: (formId: string) => `${API_BASE_URL}/752ea7e4-6eb5-4da4-9197-9877e550673d/forms/${formId}/responses`,
        getResponseById: (responseId: string) => `${API_BASE_URL}/5a4d20b5-1e70-4d47-be28-576abfc5c963/forms/responses/${responseId}`,
        deleteResponseById: (formId: string, responseId: string) => `${API_BASE_URL}/5a4d20b5-1e70-4d47-be28-576abfc5c963/forms/${formId}/responses/${responseId}`
    },
};

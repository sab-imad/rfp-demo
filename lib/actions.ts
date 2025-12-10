"use server";

import axios from "axios";
import { config } from "./config";
import { revalidatePath } from "next/cache";

export async function generateForm(prompt: string) {
  try {
    const response = await axios.post(config.api.forms, {
      prompt,
    });
    revalidatePath("/admin/forms");
    return response.data;
  } catch (error) {
    console.error(error);
    return { error: "Failed to generate form" };
  }
}

export async function getForms() {
  try {
    const response = await axios.get(config.api.forms);
    return response.data;
  } catch (error) {
    console.error(error);
    return { error: "Failed to fetch forms" };
  }
}

export async function getFormById(id: string) {
  try {
    const response = await axios.get(`${config.api.getByIdOrDelete}/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return { error: "Failed to fetch form" };
  }
}

export async function deleteForm(id: string) {
  try {
    await axios.delete(`${config.api.getByIdOrDelete}/${id}`);
    revalidatePath("/admin/forms");
  } catch (error) {
    console.error(error);
    return { error: "Failed to delete form" };
  }
}

export async function submitForm(payload: any) {
  console.log("PayLoad", payload);
  try {
    const response = await axios.post(config.api.submitForm(payload.form_id), payload);
    return response.data;
  } catch (error) {
    console.error(error);
    return { error: "Failed to submit form" };
  }
}

export async function getResponses(formId: string) {
  try {
    const response = await axios.get(config.api.getResponses(formId));
    return response.data;
  } catch (error) {
    console.error(error);
    return { error: "Failed to fetch responses" };
  }
}

export async function getResponseById(responseId: string) {
  try {
    const response = await axios.get(config.api.getResponseById(responseId));
    return response.data;
  } catch (error) {
    console.error(error);
    return { error: "Failed to fetch response" };
  }
}

export async function deleteResponse(formId: string, responseId: string) {
  try {
    await axios.delete(config.api.deleteResponseById(formId, responseId));
    revalidatePath(`/survey/${formId}`);
  } catch (error) {
    console.error(error);
    return { error: "Failed to delete response" };
  }
}

export async function askQuestion(prompt: string) {
  try {
    const response = await axios.post(config.api.chat, {
      prompt,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return { error: "Failed to get response" };
  }
}

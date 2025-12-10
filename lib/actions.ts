"use server";

import axios from "axios";

export async function generateForm(prompt: string) {
  try {
    const response = await axios.post(
      "http://34.177.94.156/webhook-test/forms",
      {
        prompt,
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return { error: "Failed to generate form" };
  }
}

export async function getForms() {
  try {
    const response = await axios.get(
      "http://34.177.94.156/webhook-test/forms"
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return { error: "Failed to fetch forms" };
  }
}
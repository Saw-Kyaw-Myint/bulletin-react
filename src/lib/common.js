export function truncateText(text, maxLength = 50) {
  if (!text) return "";
  if (text.length <= maxLength) return text;

  return text.slice(0, maxLength) + "...";
}

export const confirmApi = async ({
  apiFn,
  payload,
  update_id = null,
  confirmMessage = "The request will be saved to database. Do you want to continue?",
  successMessage = "Saved successfully!",
  invalidateKeys = [],
  onSuccess,
  onError,
  queryClient,
}) => {
  const confirmed = window.confirm(confirmMessage);
  if (!confirmed) return;

  try {
    // mark as confirmed request (optional)
    if (payload) {
      payload.is_valid_request = true;
    }
    const res = update_id
      ? await apiFn(payload, update_id)
      : await apiFn(payload);
    alert(res?.msg || successMessage);
    if (queryClient && invalidateKeys.length > 0) {
      invalidateKeys.forEach((key) => {
        queryClient.invalidateQueries(key);
      });
    }
    if (onSuccess) {
      onSuccess?.(res);
    }
  } catch (err) {
    alert("Error confirming save");
    console.error(err);
    onError?.(err);
  }
};

export const confirmApi = async ({
  apiFn,
  payload,
  update_id = null,
  confirmMessage = "The request will be saved to database. Do you want to continue?",
  successMessage = "Saved successfully!",
  invalidateKeys = [],
  onSuccess,
  onError,
  queryClient,
}) => {
  const confirmed = window.confirm(confirmMessage);
  if (!confirmed) return;

  try {
    // mark as confirmed request (optional)
    if (payload) {
      payload.is_valid_request = true;
    }
    const res = update_id
      ? await apiFn(payload, update_id)
      : await apiFn(payload);
    alert(res?.msg || successMessage);
    if (queryClient && invalidateKeys.length > 0) {
      invalidateKeys.forEach((key) => {
        queryClient.invalidateQueries(key);
      });
    }
    if (onSuccess) {
      onSuccess?.(res);
    }
  } catch (err) {
    alert("Error confirming save");
    console.error(err);
    onError?.(err);
  }
    } catch (err) {
    alert("Error confirming save");
    console.error(err);
    onError?.(err);
  }
};

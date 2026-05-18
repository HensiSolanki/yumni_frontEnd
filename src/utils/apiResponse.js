export function isHttpOk(res) {
  if (typeof res?.status === "number") {
    return res.status >= 200 && res.status < 300;
  }
  return res?.status === true && res?.data?.success !== false;
}

export function getApiPayload(res) {
  return res?.data?.data ?? res?.data;
}

export function getApiErrorMessage(res, fallback = "Request failed") {
  return (
    res?.data?.message ||
    res?.message ||
    res?.data?.response?.data?.message ||
    res?.data?.errors?.[0] ||
    fallback
  );
}

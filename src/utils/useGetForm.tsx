export const useGetForm = (e: React.FormEvent) => {
  e.preventDefault();
  const formData = new FormData(e.currentTarget as HTMLFormElement);
  const formValues = Object.fromEntries(formData);
  return formValues;
};

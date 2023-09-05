export function formDataToObject (form) {
    const formData = new FormData(form)
    return Object.fromEntries(formData.entries())
}
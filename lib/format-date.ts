const formatDate = (date: Date): string => {
    return date.toLocaleString("tr-TR", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
}

export default formatDate;
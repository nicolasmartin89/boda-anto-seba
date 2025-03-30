export const ADMIN_EMAILS = new Set([
    "anto_puntin@hotmail.com",
    "agopuntin@hotmail.com",
    "elsebamartin3@gmail.com",
    "noralibersier@gmail.com",
    "nicolasmartin89@gmail.com",
    "donadiovictor@gmail.com",
    "wolffbaltazar@gmail.com",
]);

export const isAdmin = (email?: string): boolean => {
    return email ? ADMIN_EMAILS.has(email) : false;
};

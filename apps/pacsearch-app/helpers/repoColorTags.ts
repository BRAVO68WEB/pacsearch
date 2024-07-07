export const getRepoColor = (name: string) => {
    if (name === "aur") {
        return "bg-rp-moon-love";
    } else if (
        name === "core" ||
        name === "extra" ||
        name === "community" ||
        name === "multilib" ||
        name === "testing" ||
        name === "community-testing" ||
        name === "multilib-testing" ||
        name === "core-testing" ||
        name === "extra-testing" ||
        name === "community-staging" ||
        name === "multilib-staging" ||
        name === "core-staging" ||
        name === "extra-staging"
    ) {
        return "bg-rp-moon-gold";
    } else if (
        name === "blackarch" ||
        name === "chaotic-aur" ||
        name === "mingw64"
    ) {
        return "bg-rp-moon-foam";
    } else {
        return "bg-rp-moon-iris";
    }
}

export const getRepoColorTag = (name: string) => {
    if (name === "aur") {
        return "text-rp-love";
    } else if (
        name === "core" ||
        name === "extra" ||
        name === "community" ||
        name === "multilib" ||
        name === "testing" ||
        name === "community-testing" ||
        name === "multilib-testing" ||
        name === "core-testing" ||
        name === "extra-testing" ||
        name === "community-staging" ||
        name === "multilib-staging" ||
        name === "core-staging" ||
        name === "extra-staging"
    ) {
        return "text-rp-moon-gold";
    } else if (
        name === "blackarch" ||
        name === "chaotic-aur" ||
        name === "mingw64"
    ) {
        return "text-rp-moon-foam";
    } else {
        return "text-rp-moon-iris";
    }
}
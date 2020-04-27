export const GET_TYPE = {
    MEALS_BY_AREA: "MEALS_BY_AREA",
    MEALS_BY_INGREDIENT: "MEALS_BY_INGREDIENT",
    MEALS_BY_CATEGORY: "MEALS_BY_CATEGORY",
    MEALS_BY_ID: "MEALS_BY_ID"
}

export const PAGE_TYPE = {
    INDEX: "INDEX",
    AREA: "AREA",
    SEARCH: "SEARCH",
    LIST_INGREDIENTS: "LIST_INGREDIENTS",
    INGREDIENT: "INGREDIENT",
    CATEGORY: "CATEGORY"
}

export const getPageType = (pathValue) => {
    switch(pathValue) {
        case "":
            return PAGE_TYPE.INDEX;
        case "area":
            return PAGE_TYPE.AREA;
        case "ingredients":
            return PAGE_TYPE.LIST_INGREDIENTS;
        case "ingredient":
            return PAGE_TYPE.INGREDIENT;
        case "search":
            return PAGE_TYPE.SEARCH;
        case "category":
            return PAGE_TYPE.CATEGORY;
    }
}
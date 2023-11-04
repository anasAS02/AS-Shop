import { IconDefinition, faGear, faBookmark, faBoxOpen, faUser } from "@fortawesome/free-solid-svg-icons"

const icons = [
    faBoxOpen,
    faBookmark,
    faGear,
    faUser
]

interface linksData {
    id: number;
    href: string;
    title: string;
    icon: IconDefinition;
}

export const links: linksData[] = [
    {
        id: 1,
        href: "/orders",
        title: "Orders",
        icon: faBoxOpen,
    },
    {
        id: 2,
        href: "/yourSaves",
        title: "Your Saves",
        icon: faBookmark,
    },
    {
        id: 3,
        href: "/account",
        title: "Account",
        icon: faGear,
    },
    {
        id: 4,
        href: "/signin",
        title: "Sign in",
        icon: faUser,
    },
]
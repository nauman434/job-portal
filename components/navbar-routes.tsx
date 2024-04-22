'use client'

import Link from "next/link";
import { usePathname } from "next/navigation"

const navRoutes = [
    {
        name: "Jobs",
        path: '/'
    },
    {
        name: "Companies",
        path: '/companies'
    },
    {
        name: "Career Advice",
        path: '/blogs'
    },

]

export const NavbarRoutes = () => {
    const pathname = usePathname();

    const routes = navRoutes;

    return (
        <div className="flex gap-4">
            {routes.map((route, index) => (
                <div key={index}>
                    <Link href={route.path} >
                        <p className="text-sm text-white text-primary">{route.name}</p>
                    </Link>
                </div>
            ))}
        </div>
    )

}
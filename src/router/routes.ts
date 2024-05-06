import { createElement } from "react"
import Home from "../components/Home"
import OneToOne from "../components/OneToOne"
import OneToMany from "../components/OneToMany"
import HasOneOfMany from "../components/HasOneOfMany"
import ManyToMany from "../components/ManyToMany"

export const routes = [
    { path: '/', name: 'Home', element: createElement(Home) },
    { path: '/one-to-one', name: 'OneToOne', element: createElement(OneToOne) },
    { path: '/one-to-many', name: 'OneToMany', element: createElement(OneToMany) },
    { path: '/has-one-of-many', name: 'HasOneOfMany', element: createElement(HasOneOfMany) },
    { path: '/many-to-many', name: 'ManyToMany', element: createElement(ManyToMany) },
]
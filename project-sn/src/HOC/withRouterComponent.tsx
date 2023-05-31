import {useLocation, useParams, useNavigate} from "react-router-dom"
import React from "react"

// didn't know how to do it

type PropsType = {
    match: { params: () => void }
    router: {
        location: () => void
        navigate: () => void
    }
}

export const withRouter: any = (Children: React.ComponentType) => (props: any) => {

    const location = useLocation()
    const navigate = useNavigate()
    const match = {params: useParams()}

    return <Children {...props} match={match} router={{location, navigate}}/>
}

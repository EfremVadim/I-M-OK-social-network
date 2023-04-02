import {useLocation, useParams, useNavigate} from "react-router-dom";
import React from "react";

export const withRouter = (Children) => (props) => {

        const location = useLocation();
        const navigate = useNavigate();
        const match = {params: useParams()};

        return <Children {...props} match={match} router={{location, navigate}}/>
}

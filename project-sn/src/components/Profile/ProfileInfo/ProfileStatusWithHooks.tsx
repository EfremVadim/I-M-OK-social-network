import React, {ChangeEvent, useEffect, useState} from 'react'

type PropsType = {
    status: string
    updateUserStatus: (status: string) => void
}

const ProfileStatusWithHooks: React.FC<PropsType> = (props) => {

    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState(props.status)

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    let onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }

    const activateEditMode = () => {
        setEditMode(true)
    }

    const deactivateEditMode = () => {
        setEditMode(false)
        props.updateUserStatus(status)
    }

    return (
        <div>
            {editMode ?
                <div>
                    <input autoFocus={true} onBlur={deactivateEditMode} value={status} onChange={onStatusChange}
                    />
                </div>
                :
                <div>
                    <span onDoubleClick={activateEditMode}>{props.status || '---'}</span>
                </div>
            }
        </div>
    )
}
export default ProfileStatusWithHooks
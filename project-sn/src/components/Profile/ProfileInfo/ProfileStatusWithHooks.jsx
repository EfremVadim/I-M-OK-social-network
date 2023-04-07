import React, {useState} from 'react';

const ProfileStatusWithHooks = (props) => {

    let [editMode, setEditMode] = useState(false);

    let [status, setStatus] = useState(props.status)

    let onStatusChange = (e) => {
        setStatus(e.currentTarget.value)
    }

    const activateEditMode = () => {
        setEditMode(true)
    }

    const deactivateEditMode = () => {
        setEditMode(false)
        props.updateUserStatus(status);
    }

    return (
        <div>
            {editMode ?
                <div>
                    <input autoFocus={true}
                           onBlur={deactivateEditMode}
                           value={status}
                           onChange={onStatusChange}
                    />
                </div>
                :
                <div>
                    <span onDoubleClick={activateEditMode}>{props.status || '---'}</span>
                </div>
            }
        </div>
    );
}
export default ProfileStatusWithHooks;
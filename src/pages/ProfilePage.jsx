import React from 'react'
import ProfileForm from '../components/ProfileForm'
import AuthHeader from '../components/UI/AuthHeader'

function ProfilePage() {
    return (
        <React.Fragment>
            <AuthHeader
            title="Winners never quit.Quitters never wins."
            description="Your profile is 64% completed.A complete profile has higher chances of landing a job"
            text="Complete now"/>
        <ProfileForm/>
        </React.Fragment>
    )
}

export default ProfilePage

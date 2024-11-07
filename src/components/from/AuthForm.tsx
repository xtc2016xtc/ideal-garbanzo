const AuthForm = ({type}:{type:string}) => {
    return (
        <div>
            {type === 'sign-in' && (
                <>
                    sign-in
                </>
            )}
            {type === 'sign-up' && (
                <>
                注册
                </>
            )}
        </div>
    )
}

export default AuthForm
const AuthForm = ({type}:{type:string}) => {
    return (
        <div>
            {type === 'sign-in' && (
                <>
                    登录
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
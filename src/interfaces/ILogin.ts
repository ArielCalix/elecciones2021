export interface ILoginProps {
    isLogin: boolean;
    handleLogin: (user: ILoginUserProps) => void;
}

export interface ILoginUserProps {
    idUsuario: string;
    passUsuario: string;
    nombreUsuario: string;
    token?: string;
}
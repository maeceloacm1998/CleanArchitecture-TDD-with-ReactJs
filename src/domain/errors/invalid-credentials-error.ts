export class InvalidCredentialsError extends Error{
    constructor(){
        super('Credenciais invalidas');
        this.name = 'InvalidCredentialsError';
    }
}
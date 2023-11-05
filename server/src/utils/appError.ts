class AppError extends Error {
    public statusCode: number;
    public statusText: string;

    constructor(message: string, statusCode: number, statusText: string){
        super(message);
        this.statusCode = statusCode;
        this.statusText = statusText;
        return this;
    }
}

export default AppError;
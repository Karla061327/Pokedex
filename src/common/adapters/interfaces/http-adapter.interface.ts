
//todo utilizar el adarter tendria que ahcerlo con un metodo get
export interface HttpAdapter{
    
    get<T>(url: string): Promise<T>
}
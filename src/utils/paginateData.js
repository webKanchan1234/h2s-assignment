

const paginateData=(products,page=1,size=10)=>{

    const start=(page-1)*size
    return products.slice(start,start+size)

}

export default paginateData
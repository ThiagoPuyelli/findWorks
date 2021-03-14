
export default (works: Array<any>, index: number) => {

    if(index == 0){
        works.splice(10, works.length - 10);
    } else if(index * 10 < works.length && index * 10 + 10 < works.length){
        works.splice(0, index * 10);
        works.splice(10, works.length - 10);
    } else if(index * 10 < works.length){
        works.splice(0, index * 10);
    }

    return works;

}
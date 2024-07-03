export function dateFormatter(date){
    const data = new Date(date)

    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    const formateDate = data.toLocaleDateString('en-US', options);

    return  formateDate;
}
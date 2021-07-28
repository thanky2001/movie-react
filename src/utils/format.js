
export function formatDate(date,plusYear = 0) {
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = '' + (d.getFullYear()+ plusYear);
    if (day.length < 2) 
        day = '0' + day;
    if (month.length < 2) 
        month = '0' + month;
    return [day, month, year].join('-');
};
export function formatDate2(date,plusYear = 0) {
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = '' + (d.getFullYear()+plusYear);
    if (day.length < 2) 
        day = '0' + day;
    if (month.length < 2) 
        month = '0' + month;
    return [year, month, day].join('-');
};
export const ToSlug = (str) => {
    // Chuyển hết sang chữ thường
    str = str.toLowerCase();
    //loại bỏ dấu gạch
    str = str.replace('-', '')

    // xóa dấu
    str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, 'a');
    str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, 'e');
    str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, 'i');
    str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, 'o');
    str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, 'u');
    str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, 'y');
    str = str.replace(/(đ)/g, 'd');

    // Xóa ký tự đặc biệt
    str = str.replace(/([^0-9a-z-\s])/g, '');

    // Xóa khoảng trắng thay bằng ký tự -
    str = str.replace(/(\s+)/g, '-');

    // xóa phần dự - ở đầu
    str = str.replace(/^-+/g, '');

    // xóa phần dư - ở cuối
    str = str.replace(/-+$/g, '');

    // return
    return str;
}
export const getEmbedId=(str)=>{
    if (str.lastIndexOf('https://youtu.be/') !== -1) {
        str = str.replace('https://youtu.be/', '');
    }else if(str.lastIndexOf('https://www.youtube.com/embed/') !== -1 ){
        str = str.replace('https://www.youtube.com/embed/','')
    }else {
        str = str.replace('https://www.youtube.com/watch?v=','')
    }
    return str
}
export const splitString = (str)=>{
    let sp = str.split('-')
    return sp;
}
export const splitDateString = (time)=>{
    let date = time.split('T')
    return date;
}
export const formatDateToVN = (time)=>{
    let date = time.split('T')
    date = date[0].split('-')
    return [date[2],date[1],date[0]].join('.');
}
export const getParamId = (url) => {
    let type = url.split('/')[1] && url.split('/')[1];
    let id = url.split('/')[2] && url.split('/')[2];
    id = id && id.split('-')[0];
    return {id: id, type: type};
}
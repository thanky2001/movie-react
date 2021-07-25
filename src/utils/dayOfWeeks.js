export const dayOfWeeks = () => {
    let arrDate = [];
    for (let i = 0; i < 7; i++) {
        let date = new Date(new Date().setDate(new Date().getDate() + i));
        let currentDay = date.getDay();
        let dayName = '';
        switch (currentDay) {
            case 0:
                dayName = "Chủ nhật";
                break;
            case 1:
                dayName = "Thứ hai";
                break;
            case 2:
                dayName = "Thứ ba";
                break;
            case 3:
                dayName = "Thứ tư";
                break;
            case 4:
                dayName = "Thứ năm";
                break;
            case 5:
                dayName = "Thứ sáu";
                break;
            case 6:
                dayName = "Thứ bảy";
                break;
            default:
                break;
            }
        let day = '' +date.getDate();
        let month = '' +date.getMonth();
        let fullYear = '' +date.getUTCFullYear();
        if (day.length < 2){
            day = '0' + day;
        }
        if (month.length < 2){
            month = '0' + month;
        }
        let obj = {dayName: dayName, day: day,month: month, fullYear: fullYear, date: [day, month, fullYear].join('-')}
        arrDate.push(obj)
    }
    return arrDate;
}
import React from "react"


// Sorts the days of the week in order ------------------------------------------------------------------
const sorter = {
    "monday": 1,
    "tuesday": 2,
    "wednesday": 3,
    "thursday": 4,
    "friday": 5,
    "saturday": 6,
    "sunday": 7
}

export const sortByDay = (data) => {
    data.sort(function sortByDay(a, b) {
        let day1 = a.toLowerCase();
        let day2 = b.toLowerCase();
        return sorter[day1] - sorter[day2];
    });
    return data
}
// ----------------------------------------------------------------------------------------------------

// Format time helper, used in Set Time Helper --------------------------------------------------------
export const formatTime = (time24) => {
    const [sHours, minutes] = time24.match(/([0-9]{1,2}):([0-9]{2})/).slice(1);
    const period = +sHours < 12 ? 'AM' : 'PM';
    const hours = +sHours % 12 || 12;

    return `${hours}:${minutes}${period}`;
}
// ----------------------------------------------------------------------------------------------------

// Set Time Helper ------------------------------------------------------------------------------------
export const setHHTime = (post, day) => {
    if (post.hours[day].end2 !== null) {
        return (
            <strong>{` ${formatTime(post.hours[day].start)} - ${formatTime(post.hours[day].end)} & ${formatTime(post.hours[day].start2)} - ${formatTime(post.hours[day].end2)}:`} </strong>
        )
    } else {
        return <strong>{` ${formatTime(post.hours[day].start)} - ${formatTime(post.hours[day].end)}:`} </strong>
    }
}
// ----------------------------------------------------------------------------------------------------

// Format Phone Helper --------------------------------------------------------------------------------
export const formatPhoneNumber = (str) => {
    //Filter only numbers from the input
    let cleaned = ('' + str).replace(/\D/g, '');
    //Check if the input is of correct length
    let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        return '(' + match[1] + ') ' + match[2] + '-' + match[3]
    };
    return null
};
// ----------------------------------------------------------------------------------------------------

// Format Dollars from Cents Helper -------------------------------------------------------------------
export const formatCurrency = (str) => {
    // Convert to number. Int because there will be no decimals
    var num = parseInt(str);
    // Convert to readable dollar amount
    var dollars = num / 100;
    return dollars = dollars.toLocaleString("en-US", { style: "currency", currency: "USD" });
};
// ----------------------------------------------------------------------------------------------------


// Check number of remainging vouchers ----------------------------------------------------------------
export const checkRemaining = (sold, quantity) => {
    if (sold >= quantity) {
        return "Sold Out!"
    } else if (sold) {
        return quantity - sold
    } else {
        return quantity
    }
}
// ----------------------------------------------------------------------------------------------------

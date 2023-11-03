// script.js

// Sắp xếp mảng reports theo ngày giảm dần



// Sắp xếp mảng reports theo ngày giảm dần
const sortedReports = reports.sort((a, b) => {
    const dateA = new Date(a.formattedDate);
    const dateB = new Date(b.formattedDate);
    return dateB - dateA;
});


// Truyền sortedReports vào mẫu Handlebars
const template = Handlebars.compile();
const rendered = template({ reports: sortedReports });






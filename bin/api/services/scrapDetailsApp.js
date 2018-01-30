"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio = require("cheerio");
const rp = require("request-promise");
const bluebird_1 = require("bluebird");
const url = 'https://play.google.com';
async function getAppInfo(apps) {
    const allAppInfo = apps.detailsUrl.map(async (a) => {
        const body = await rp(`${url}${a}`);
        const $ = cheerio.load(body);
        const detailsInfo = $('.details-info');
        return {
            categoryName: apps.categoryName,
            developerCompany: detailsInfo.find('span[itemprop="name"]').text(),
            icon: detailsInfo.find('img.cover-image').attr('src'),
            value: detailsInfo.find('meta[itemprop=price]').attr('content'),
            bundleId: a.slice(23, a.length),
            name: detailsInfo.find('.document-title').text().trim(),
            rating: parseFloat($('.rating-box').find('div.score').text().replace(',', '.')) || 0
        };
    });
    return bluebird_1.Promise.all(allAppInfo);
}
async function scrapDetailsApp(appsUrl) {
    let apps = [];
    for (let app of appsUrl) {
        apps.push(await getAppInfo(app));
    }
    console.log('Finished Scrap');
    return apps;
}
exports.scrapDetailsApp = scrapDetailsApp;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NyYXBEZXRhaWxzQXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc2VydmVyL2FwaS9zZXJ2aWNlcy9zY3JhcERldGFpbHNBcHAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtQ0FBbUM7QUFDbkMsc0NBQXNDO0FBQ3RDLHVDQUFtQztBQUVuQyxNQUFNLEdBQUcsR0FBRyx5QkFBeUIsQ0FBQztBQUV0QyxLQUFLLHFCQUFxQixJQUFTO0lBRWpDLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBQyxDQUFDLEVBQUMsRUFBRTtRQUMvQyxNQUFNLElBQUksR0FBRyxNQUFNLEVBQUUsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3BDLE1BQU0sQ0FBQyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFN0IsTUFBTSxXQUFXLEdBQUcsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBRXZDLE1BQU0sQ0FBQztZQUNMLFlBQVksRUFBRSxJQUFJLENBQUMsWUFBWTtZQUMvQixnQkFBZ0IsRUFBRSxXQUFXLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLENBQUMsSUFBSSxFQUFFO1lBQ2xFLElBQUksRUFBRSxXQUFXLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUNyRCxLQUFLLEVBQUUsV0FBVyxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7WUFDL0QsUUFBUSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUM7WUFDL0IsSUFBSSxFQUFFLFdBQVcsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLEVBQUU7WUFDdkQsTUFBTSxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO1NBQ3JGLENBQUM7SUFDSixDQUFDLENBQUMsQ0FBQztJQUVILE1BQU0sQ0FBQyxrQkFBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUNqQyxDQUFDO0FBRU0sS0FBSywwQkFBMEIsT0FBWTtJQUNoRCxJQUFJLElBQUksR0FBRyxFQUFFLENBQUM7SUFDZCxHQUFHLENBQUMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQzlCLE1BQU0sQ0FBQyxJQUFJLENBQUM7QUFDZCxDQUFDO0FBUEQsMENBT0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBjaGVlcmlvIGZyb20gJ2NoZWVyaW8nO1xuaW1wb3J0ICogYXMgcnAgZnJvbSAncmVxdWVzdC1wcm9taXNlJztcbmltcG9ydCB7IFByb21pc2UgfSBmcm9tICdibHVlYmlyZCc7XG5cbmNvbnN0IHVybCA9ICdodHRwczovL3BsYXkuZ29vZ2xlLmNvbSc7XG5cbmFzeW5jIGZ1bmN0aW9uIGdldEFwcEluZm8oYXBwczogYW55KTogUHJvbWlzZTxhbnk+IHtcblxuICBjb25zdCBhbGxBcHBJbmZvID0gYXBwcy5kZXRhaWxzVXJsLm1hcChhc3luYyBhID0+IHtcbiAgICBjb25zdCBib2R5ID0gYXdhaXQgcnAoYCR7dXJsfSR7YX1gKTtcbiAgICBjb25zdCAkID0gY2hlZXJpby5sb2FkKGJvZHkpO1xuXG4gICAgY29uc3QgZGV0YWlsc0luZm8gPSAkKCcuZGV0YWlscy1pbmZvJyk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgY2F0ZWdvcnlOYW1lOiBhcHBzLmNhdGVnb3J5TmFtZSxcbiAgICAgIGRldmVsb3BlckNvbXBhbnk6IGRldGFpbHNJbmZvLmZpbmQoJ3NwYW5baXRlbXByb3A9XCJuYW1lXCJdJykudGV4dCgpLFxuICAgICAgaWNvbjogZGV0YWlsc0luZm8uZmluZCgnaW1nLmNvdmVyLWltYWdlJykuYXR0cignc3JjJyksXG4gICAgICB2YWx1ZTogZGV0YWlsc0luZm8uZmluZCgnbWV0YVtpdGVtcHJvcD1wcmljZV0nKS5hdHRyKCdjb250ZW50JyksXG4gICAgICBidW5kbGVJZDogYS5zbGljZSgyMywgYS5sZW5ndGgpLFxuICAgICAgbmFtZTogZGV0YWlsc0luZm8uZmluZCgnLmRvY3VtZW50LXRpdGxlJykudGV4dCgpLnRyaW0oKSxcbiAgICAgIHJhdGluZzogcGFyc2VGbG9hdCgkKCcucmF0aW5nLWJveCcpLmZpbmQoJ2Rpdi5zY29yZScpLnRleHQoKS5yZXBsYWNlKCcsJywgJy4nKSkgfHwgMFxuICAgIH07XG4gIH0pO1xuXG4gIHJldHVybiBQcm9taXNlLmFsbChhbGxBcHBJbmZvKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNjcmFwRGV0YWlsc0FwcChhcHBzVXJsOiBhbnkpOiBQcm9taXNlPGFueT4ge1xuICBsZXQgYXBwcyA9IFtdO1xuICBmb3IgKGxldCBhcHAgb2YgYXBwc1VybCkge1xuICAgIGFwcHMucHVzaChhd2FpdCBnZXRBcHBJbmZvKGFwcCkpO1xuICB9XG4gIGNvbnNvbGUubG9nKCdGaW5pc2hlZCBTY3JhcCcpO1xuICByZXR1cm4gYXBwcztcbn0iXX0=
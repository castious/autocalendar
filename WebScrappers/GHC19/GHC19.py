from selenium import webdriver
from bs4 import BeautifulSoup
import csv
import re

TIMEZONE = "UTC-4"


def get_calendar_events_from_ghc2019(url, calendarId, csvFilenameOut):
    # Use selenium since js objects break descriptions. Needs geckodriver to be installed
    driver = webdriver.Firefox()
    driver.implicitly_wait(15)
    driver.get(url)
    html = BeautifulSoup(driver.page_source, 'lxml')
    driver.close()
    containers = html.findAll("div", {"class": "reg-matrix-header-container"})

    calendarEvents = []
    calendarEvents.append(["ID", calendarId])
    calendarEvents.append(["Name", "StartTime", "EndTime", "TimeZone",
                           "Location", "Description", "MoreDetails", "IsScheduled"])
    for event in containers:
        name = event.find('h3').get_text().strip()
        dates = event.findAll("span", {"style": "white-space: nowrap;"})
        startDate = dates[0].find("span").get_text()
        startTime = dates[1].find("span").get_text()
        endDate = startDate
        endTime = dates[2].find("span").get_text()
        start = startDate + " " + startTime
        end = endDate + " " + endTime
        location = event.find(text=re.compile("Location:")).parent.find(
            "span", {"class": "date"}).get_text()
        description = event.find("div", {"class": "session-info"}).get_text().replace(
            "View Description", "").replace("Hide Description", "").replace('\t', " ").strip()
        moreDetails = event.find("div", {"class": "session-description"})
        if moreDetails is not None:
            moreDetails = moreDetails.get_text().replace('\t', " ").strip()
        calendarEvents.append(
            [name, start, end, TIMEZONE, location, description, moreDetails, "N"])
    with open(csvFilenameOut, 'w') as writeFile:
        writer = csv.writer(writeFile, delimiter='\t')
        writer.writerows(calendarEvents)

get_calendar_events_from_ghc2019("Get your events page link here", "Get your calendar ID and place here", "ghcCalendar.csv")

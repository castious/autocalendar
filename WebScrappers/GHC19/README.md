<h2>Installation notes for GHC19.py</h2>

Here you can just use the CSV for GHC19 or go through and scrape things yourself :) Make sure you are looking at the screen with the location available!

<p align="center">
  <img src="./img/GHC19.png" alt="Correct event page" width="650">
</p>


Required modules:

<ul>
<li>Selenium
<li>Beautiful Soup
<li>RE
<li>Firefox (and Geckodriver)
</ul>

Commands for Majaro (Arch) linux:

    sudo pip install selenium
    sudo pip install bs4
    sudo pip install re
    sudo pacman -S geckodriver

If you're unfamilar with python, just pop the python file in and install all your dependencies. After that you use the function in the python file with your link to the events (should look like my screenshot), calendarID (see the [exporter](https://github.com/castious/autocalendar/tree/master/SheetsExporter) for details on how to get this), and any output name for the csv.

Hop on over to the exporter with the CSV to export to google calendar.

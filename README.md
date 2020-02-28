# EngagementTracker

Prototype dashboard for Digital Academy Engagement.

The first version of this dashboard was built between Feb 26 and Feb 27 2020. It's an experiment in generating flexible, mobile, and live dashboard to increase visibility. Also to show the value of experimentation. You can do a lot in a little time.

Check it out [https://dis-sin.github.io/EngagementTracker/](https://dis-sin.github.io/EngagementTracker/)

## How it was built

We aimed for maximum simplicity, it was replacing a static paper copy, so we didnt want to build something super complex until we were able to understand out users needs.

Here's what it does:
* Read from google sheets via json api
* Extract rows 1 ... N with cols A ... Z from return
* Generates charts based on summary metrics (both from sheet, and calculated)
* Live updates every 10 mins
* Small codebase, vanilla HTML/CSS/JS
* Can run from a desktop, pi attached to a tv, or hosted on github pages and accessed via browser

There's two parts that make this up. The dashboard and the data adapter. 

The dashboard makes use of [amCharts](https://www.amcharts.com/) to render nice graphs. [Bootstrap 4](https://getbootstrap.com/) for layout and general styling. The rest we tried to keep light and install free. Probably use Chrome or Firefox though. Haven't tested for IE.

The data adapter is a bit of code to take one format and shape it to fit the other. There's two ways in. One is a direct copy paste out of your sheet and into the dashboard, and the other is via the API calls. Both methods are fed to an adapter than creates an object that the dashboard can consume. The data effectively flows API.json -> tsv -> jsobj.

## How to use it

Check it out [https://dis-sin.github.io/EngagementTracker/](https://dis-sin.github.io/EngagementTracker/)

Or just clone the repo and tinker away. It can be setup to read from a static file in the /data folder as well. All depends on how you want to adapt it to your purposes.

## Notes

Known: If the dashboard refreshes when you're not on page, you might see NaN values. On the next refresh or manual refresh that goes away.
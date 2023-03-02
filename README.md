# Yummy Trucks

A engineering challenge from https://github.com/peck/engineering-assessment

## How to play

### Install Dependencies

I'm using the [pnpm](https://pnpm.io/installation) for package manangement tool in this application, so if you haven't installed it before, just click the [link](https://pnpm.io/installation) and follow the instruction to install it first.

Assume you have installed the pnpm, clone the repo into your local, and go to the root path of the repo, run

```
pnpm i
```

This will help you to install all the dependencies library the app need.

### Run on Local

```
pnpm run dev
```

Then open http://localhost:3000 and input the truck name you favorite and press enter to seach.

Find it list left side, click to fly to it on the map.

### Build on Server

Assume you want to deploy to code to server and you have download the source code and installed pnpm on server.

Go to the root path of the code, run

```bash
# alway install dependency before you build
pnpm i
# build and start the service of both frontend & backend
pnpm run build && pnpm run start
```

### Generate new Datasource

In the root path of the code, you find the [pre-build data file](/data.json). If you'd like to change it, go to the [folder](/data/) and relpace the [trucks.csv](/data/trucks.csv) with same headers and filename.

Then go back to the root path of the code, run

```
pnpm run data:generate
```

And restart the server, you can see the latest search results.

## Gossip

I got this challenge to using some open data to make something for helping people to manager their food truck habit. It's a freeform target so I need to make something interesting and helpful to make everybody happy.

But, how?

When I looked at the csv file, it named as `Mobile Food Facility Permit`. I'm thinking maybe the mobile is the most difference with other food supply places. So, I decided to introduce Map service into the app. I've never tried to use GEO API and map library before, but it sounds like intreseting and chanllenge to me.

So let's start to work.

First thing, I need to convert the csv file into JS friendly format, like a json file. So I wrote the [script](/data/generate.js) to convert csv to json.

Then I need a backend to server the data to frontend, I decide to build a Express server, which I familiar with, at first. But depends on the time limitation, I think a Next.js framework with it's api support maybe enough.

Finally, the mainly tech is conbine with Next.js, Chakra UI, Axios, and Leaflet as the map library.

I plan to make a map search application. I found if the search result, include 600+ rows, all render on the page will cause performance issue. So I introduce the React-Window lib to improve it.

OK, that's all. Hope you will like the application I made.

PS: I think you may also using it on you cell phone. So I also add the find where you are feature on the bottom left corner of the map.

## Next Steps

1. Improve the layout for UI
2. Add database to store the search keywods, show a ranking of popular trucks.
3. Go to the streets find the real trucks, intruducing the app to the truck owners, maybe someone will invest us.

## Contact Me

For any questions, suggestions or further cooperation, please leave issues or [email](mailto:seeskyblue@163.com) me directly. Thank you and enjoy the app.

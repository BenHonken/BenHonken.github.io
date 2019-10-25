# Ben Honken - Weather Dashboard

## Description

This is a weather by Ben Honken.  It uses the openweather API.  Searching a city will show the current conditions and a 5 day forecast.  You can see an example here.  

[Screenshot](assets/images/screenshot.png)

All searched cities are saved to local storage and a list is populated so that you can click any city you've searched before to search it again.  The most recently searched city is moved to the top.  You can see the function that handles this here.

[listCities()](assets/images/listCities.png)

The city buttons are cleared out and new buttons are added.  Because the buttons are removed and replaced, the event listener must be included in the function.  The event listener grabs the text from the button, runs the AJAX calls, then checks to see if the city is already in the list.  If it is not, it simply adds it to the beginning.  If it is, the city is pushed to a new array, and each other city is pushed to this new array as well.  The new array then replaces the old one.  Lastly, the city list is repopulated, and the local storage is updated.  

This application currently uses 3 separate AJAX calls.  The most complicated one is the forecast, shown here.

[getForecast()](assets/images/getForecast.png)

The query URL is set up to use the selected city and give us imperial units.  The boxes and fields that make up the forecast are created during the call.  One thing that may seem odd is the index of `i*8`.  Unfortunately, the portion of the openweather API that gives daily forecasts is paid.  The free version does, however, give a forecast for every 3 hours through the next 5 days, so to get a forecast for each day, I just used every eighth call since 8*3 is 24.  Aside from that, it's all pretty straight forward once you understand how to navigate the object returned from the call. 



## Usage

As a person who goes outside, I want to know the temperature and what level of precipitation to expect so that I can be prepared and appropriately dressed.  We all need to know the weather.

## Credits

So far it's all me.  I'll update this if and when that changes.

## License

MIT License

Copyright (c) [2019] [Ben Honken]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


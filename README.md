# Binance App Backend
A very simple backend server to integrate with a cordova app to display information from Binance that is either unavailable or clumsy to access in the official Binance app

# Intent
This isn't designed to be a super useful app for everyone. Despite its inaccuracy with changing currency prices, all I'm really looking for is a way to aggregate all currencies in which I've invested to compute the overall purchase price (will be inaccurate unless I decide to align historical Ether and Bitcoin prices with purchase time) and then use web sockets to show real-time gains/losses.

# Goals
* Make the app accept an API key/secret combo to post to the backend and make the app useable by other people
NOTE: If this goal becomes a reality, make sure the API key only has read access!
* Possibly calculate overall purchase prices based on past Bitcoin/Ether prices to give a better calculation of gains/losses

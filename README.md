# Christmas Game 2016

This is the repo for the Mayden Academy christmas game 2016.


## API documentation

The game uses a very simple API, that follows some but not all of the REST principals. It is documented below:

#### POST:

**/api/**                      

The api endpoint expects the following JSON:

```
{
    action: x
}
```

The value of the action property will determin what the API does. Each action expects different data to execute. All actions will return the same data structure:

```
{
  success: BOOLEAN,
  message: 'String', // human readable information about the request
  data: {} // additional information about the request
}
```

#### Available action values are:

*createUser*

```
{
    action:    'createUser',
    userName:  'String',
    userEmail: 'String'
}
```
This action will create or update a user and return the following data object:
```
{
    curAttempt: Number, // Amount of attempts the user has tried
    uid:        Number // the users ID
}
```

*saveAttempt*

```
{
    action:  'saveAttempt',
    uid:     Number, // the users ID
    time:    Number, // amount of time in seconds
    attempt: Number  // the number of attempts the user has made
}
```
This action will save the users game attempt and return the following standard response object with no additional data.

*getLeaderboard*

No data is required.

This action will return the top 5 users names and their times, longest play first, in the following data object:
```
{
    leaderboard: [
      {
        name: 'String', // the users name
        time: Number    // the amount time that user played the game for before dying in seconds
      }
    ]
}
```

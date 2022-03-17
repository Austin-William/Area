import 'package:area/pages/verified_page.dart';
import 'package:dio/dio.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:area/pages/dashboard.dart';
import 'package:area/pages/login.dart';
import 'package:area/global/variables.dart' as global;

class Home extends StatelessWidget {
  const Home({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    Dio dio = Dio();

    sendLoginUser(String email, String password) async {
      try {
        await dio.get(global.url + '/api/users').then(
          (value) {
            if (kDebugMode) {
              print('Processing...');
            }
            if (value.data.length > 0) {
              var searchUser = value.data.where((element) {
                return element['login'] == global.email;
              });
              if (kDebugMode) {
                print('Search user done');
              }
              if (searchUser.length == 0) {
                if (kDebugMode) {
                  print('User not found');
                }
                dio.post(
                  global.url + '/api/user',
                  data: {
                    'login': email,
                    'password': password,
                    'status': "none",
                    'subscriptions': [
                      {
                        "name": "Weather",
                        "state": false,
                        "widgets": [
                          {
                            "name": "city-temperature",
                            "description": "Display temperature for a city",
                            "api": [
                              {"input": "none", "placeholder": "", "link": ""}
                            ],
                            "actions": [
                              {
                                "name": "Weather Temperature",
                                "input": "town",
                                "placeholder": "Search a City",
                                "link": "/api/weather/temp/"
                              },
                              {
                                "name": "Weather Description",
                                "input": "city",
                                "placeholder": "Search a City",
                                "link": "/api/weather/sky/"
                              }
                            ],
                            "reactions": [
                              {
                                "name": "Email",
                                "link": "/api/reactions/",
                                "id": "email"
                              },
                              {
                                "name": "Notification",
                                "link": "/api/reactions/",
                                "id": "notification"
                              }
                            ]
                          }
                        ]
                      },
                      {
                        "name": "Unsplash",
                        "state": false,
                        "widgets": [
                          {
                            "name": "photo high quality",
                            "description": "Display high quality photo",
                            "api": [
                              {"input": "none", "placeholder": "", "link": ""}
                            ],
                            "actions": [
                              {
                                "name": "Category photo",
                                "input": "photo",
                                "placeholder": "Search a photo",
                                "type": "username",
                                "link": "/api/unsplash/"
                              },
                              {
                                "name": "Random photo",
                                "link": "/api/unsplash/random"
                              }
                            ],
                            "reactions": [
                              {
                                "name": "Email",
                                "link": "/api/reactions/",
                                "id": "email"
                              },
                              {
                                "name": "Notification",
                                "link": "/api/reactions/",
                                "id": "notification"
                              }
                            ]
                          }
                        ]
                      },
                      {
                        "name": "Github",
                        "state": false,
                        "widgets": [
                          {
                            "name": "profile",
                            "description": "See any Github profile",
                            "api": [
                              {
                                "input": "access_token",
                                "placeholder": "Github access token",
                                "link": "/api/github/connect/"
                              }
                            ],
                            "actions": [
                              {
                                "name": "Search user",
                                "input": "username",
                                "placeholder": "Search an user",
                                "link": "/api/github/"
                              },
                              {
                                "name": "Set Name Folder",
                                "input": "name_folder",
                                "placeholder": "Create a new folder",
                                "link": "/api/github/setNameFolder/"
                              }
                            ],
                            "reactions": [
                              {
                                "name": "Email",
                                "link": "/api/reactions/",
                                "id": "email"
                              },
                              {
                                "name": "Notification",
                                "link": "/api/reactions/",
                                "id": "notification"
                              },
                              {
                                "name": "Create a Github repo",
                                "input": "repo",
                                "placeholder": "Name of the repo",
                                "link": "/api/reactions/",
                                "id": "repo"
                              }
                            ]
                          }
                        ]
                      },
                      {
                        "name": "Anime",
                        "state": false,
                        "widgets": [
                          {
                            "name": "broadcast day",
                            "description": "See any anime broadcast day",
                            "api": [
                              {"input": "none", "placeholder": "", "link": ""}
                            ],
                            "actions": [
                              {
                                "name": "Last Anime Updated",
                                "input": "name",
                                "placeholder": "Search a MAL account",
                                "link": "/api/anime/UpdatedAnime/"
                              },
                              {
                                "name": "Last Manga Updated",
                                "input": "name",
                                "placeholder": "Search a MAL account",
                                "link": "/api/anime/UpdatedManga/"
                              },
                              {
                                "name": "Watching Anime is Airing",
                                "input": "user",
                                "placeholder": "Search a MAL account",
                                "link": "/api/anime/WatchingList/"
                              },
                              {
                                "name": "Episode from Plan to Watch",
                                "input": "maluser",
                                "placeholder": "Search a MAL account",
                                "link": "/api/anime/PTWIsAiring/"
                              },
                              {
                                "name": "Current Anime Season Top 10",
                                "link": "/api/anime/SeasonTop/"
                              }
                            ],
                            "reactions": [
                              {
                                "name": "Email",
                                "link": "/api/reactions/",
                                "id": "email"
                              },
                              {
                                "name": "Notification",
                                "link": "/api/reactions/",
                                "id": "notification"
                              }
                            ]
                          }
                        ]
                      },
                      {
                        "name": "Twitter",
                        "state": false,
                        "widgets": [
                          {
                            "name": "trends",
                            "description": "See all trends",
                            "api": [
                              {"input": "none", "placeholder": "", "link": ""}
                            ],
                            "actions": [
                              {
                                "name": "Top trends world",
                                "link": "/api/twitter/trends/world"
                              },
                              {
                                "name": "Top trends France",
                                "link": "/api/twitter/trends/france"
                              },
                              {
                                "name": "Top trends by location",
                                "input": "location",
                                "placeholder": "Write lat=nb&long=nb",
                                "link": "/api/twitter/location/"
                              }
                            ],
                            "reactions": [
                              {
                                "name": "Email",
                                "link": "/api/reactions/",
                                "id": "email"
                              },
                              {
                                "name": "Notification",
                                "link": "/api/reactions/",
                                "id": "notification"
                              },
                              {
                                "name": "Create a Github repo",
                                "input": "repo",
                                "placeholder": "Name of the repo",
                                "link": "/api/reactions/",
                                "id": "repo"
                              }
                            ]
                          }
                        ]
                      },
                      {
                        "name": "Crypto",
                        "state": false,
                        "widgets": [
                          {
                            "name": "bitcoin",
                            "description":
                                "Display bitcoin percentage changer 24",
                            "api": [
                              {"input": "none", "placeholder": "", "link": ""}
                            ],
                            "actions": [
                              {
                                "name": "Percentage change 24h crypto",
                                "input": "id",
                                "placeholder": "Search a crypto",
                                "link": "/api/crypto/"
                              }
                            ],
                            "reactions": [
                              {
                                "name": "Email",
                                "link": "/api/reactions/",
                                "id": "email"
                              },
                              {
                                "name": "Notification",
                                "link": "/api/reactions/",
                                "id": "notification"
                              }
                            ]
                          }
                        ]
                      },
                      {
                        "name": "Covid",
                        "state": false,
                        "widgets": [
                          {
                            "name": "number",
                            "description":
                                "See Number people infected by Covid-19 in France",
                            "api": [
                              {"input": "none", "placeholder": "", "link": ""}
                            ],
                            "actions": [
                              {"name": "Covid Number", "link": "/api/covid/"}
                            ],
                            "reactions": [
                              {
                                "name": "Email",
                                "link": "/api/reactions/",
                                "id": "email"
                              },
                              {
                                "name": "Notification",
                                "link": "/api/reactions/",
                                "id": "notification"
                              }
                            ]
                          }
                        ]
                      },
                      {
                        "name": "Esport",
                        "state": false,
                        "widgets": [
                          {
                            "name": "day Matches",
                            "description": "See new Day Matches",
                            "api": [
                              {"input": "none", "placeholder": "", "link": ""}
                            ],
                            "actions": [
                              {
                                "name": "Day Matches",
                                "input": "game",
                                "placeholder": "Search a game",
                                "link": "/api/esport/DayMatches/"
                              },
                              {
                                "name": "Past Matches",
                                "input": "videogame",
                                "placeholder": "Search a game",
                                "link": "/api/esport/PastMatches/"
                              },
                              {
                                "name": "Tournaments",
                                "input": "vgame",
                                "placeholder": "Search a game",
                                "link": "/api/esport/Tournaments/"
                              }
                            ],
                            "reactions": [
                              {
                                "name": "Email",
                                "link": "/api/reactions/",
                                "id": "email"
                              },
                              {
                                "name": "Notification",
                                "link": "/api/reactions/",
                                "id": "notification"
                              }
                            ]
                          }
                        ]
                      },
                      {
                        "name": "Football",
                        "state": false,
                        "widgets": [
                          {
                            "name": "standings",
                            "description": "See updated ligue 1 standings",
                            "api": [
                              {"input": "none", "placeholder": "", "link": ""}
                            ],
                            "actions": [
                              {
                                "name": "Football Standings",
                                "link": "/api/football/Standings/"
                              },
                              {
                                "name": "Football Scorers",
                                "link": "/api/football/Scorers/"
                              },
                              {
                                "name": "Football Matches",
                                "link": "/api/football/Matches/"
                              },
                              {
                                "name": "Team Matches",
                                "input": "team",
                                "placeholder": "Search a Ligue 1 Team",
                                "link": "/api/football/Team/"
                              }
                            ],
                            "reactions": [
                              {
                                "name": "Email",
                                "link": "/api/reactions/",
                                "id": "email"
                              },
                              {
                                "name": "Notification",
                                "link": "/api/reactions/",
                                "id": "notification"
                              }
                            ]
                          }
                        ]
                      },
                      {
                        "name": "News",
                        "state": false,
                        "widgets": [
                          {
                            "name": "get News",
                            "description": "See Up-to-Date News",
                            "api": [
                              {"input": "none", "placeholder": "", "link": ""}
                            ],
                            "actions": [
                              {
                                "name": "News by Country",
                                "input": "country",
                                "placeholder": "Search a contry (2 characters)",
                                "link": "/api/news/Country/"
                              },
                              {
                                "name": "News by Subject",
                                "input": "subject",
                                "placeholder": "Search a subject",
                                "link": "/api/news/Subject/"
                              },
                              {
                                "name": "News by Source",
                                "input": "source",
                                "placeholder": "Search a source",
                                "link": "/api/news/Source/"
                              }
                            ],
                            "reactions": [
                              {
                                "name": "Email",
                                "link": "/api/reactions/",
                                "id": "email"
                              },
                              {
                                "name": "Notification",
                                "link": "/api/reactions/",
                                "id": "notification"
                              }
                            ]
                          }
                        ]
                      }
                    ],
                    'notifications': [],
                    'actionsreactions': []
                  },
                );
              }
            }
          },
        );
      } catch (e) {
        if (kDebugMode) {
          print(e);
        }
      }
    }

    return Scaffold(
      resizeToAvoidBottomInset: false, // évite le overflowed by pixels
      body: StreamBuilder(
        stream: FirebaseAuth.instance.authStateChanges(),
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(
              child: CircularProgressIndicator(),
            );
          } else if (snapshot.hasError) {
            return const Center(
              child: Text('Something went wrong ! Try again later'),
            );
          } else if (snapshot.hasData) {
            bool verified = FirebaseAuth.instance.currentUser!.emailVerified;
            String user = FirebaseAuth.instance.currentUser!.email!;
            sendLoginUser(user, "Google Mobile Auth");
            if (verified == true) {
              global.isLoggedIn = true;
              return const Dashboard();
            } else {
              FirebaseAuth.instance.currentUser!.sendEmailVerification();
              return const VerificationPage();
            }
          } else {
            global.isLoggedIn = false;
            return const Login();
          }
        },
      ),
    );
  }
}

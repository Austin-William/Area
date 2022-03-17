import 'package:dio/dio.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:area/global/variables.dart' as global;
// import 'package:area/components/widget.dart';

class ApiPage extends StatefulWidget {
  const ApiPage({Key? key}) : super(key: key);

  @override
  _ApiPageState createState() => _ApiPageState();
}

class _ApiPageState extends State<ApiPage> {
  bool weatherState = false;
  bool unsplashState = false;
  bool githubState = false;
  bool animeState = false;
  bool twitterState = false;
  bool cryptoState = false;
  bool covidState = false;
  bool esportState = false;
  bool footballState = false;

  String accessToken = "";

  dynamic sendData() async {
    try {
      final dynamic response =
          await Dio().post(global.url + '/api/user/' + global.email);
      if (response.statusCode == 200) {
        if (kDebugMode) {
          print(response.data);
        }
        return response.data;
      } else {
        throw Exception('Failed to load data');
      }
    } catch (e) {
      if (kDebugMode) {
        print(e);
      }
    }
  }

  sendNewState(String url) {
    Dio dio = Dio();
    //print("================");
    dio.put(url).then(
      (response) {
        if (kDebugMode) {
          print(response.data);
        }
      },
    );
  }

  alertDialog(BuildContext context) {
    var alert = AlertDialog(
      title: const Text(
        'Access Token of a Github profile :',
        style: TextStyle(
          fontSize: 16,
        ),
      ),
      content: TextField(
        controller: TextEditingController(),
        decoration: const InputDecoration(
          hintText: "Access token",
        ),
        onSubmitted: (value) {
          setState(() {
            accessToken = value;
          });
          Dio dio = Dio();
          dio.post(global.url +
              global.userData['subscriptions'][2]['widgets'][0]['api'][0]
                  ['link'] +
              accessToken);
          dio.put(global.url + "/api/user/" + global.userData['id'],
              data: {"subscriptions": global.userData['subscriptions']});
        },
      ),
    );
    showDialog(context: context, builder: (BuildContext context) => alert);
  }

  @override
  Widget build(BuildContext context) {
    weatherState = global.weatherState;
    unsplashState = global.unsplashState;
    githubState = global.githubState;
    animeState = global.animeState;
    twitterState = global.twitterState;
    cryptoState = global.cryptoState;
    covidState = global.covidState;
    esportState = global.esportState;
    footballState = global.footballState;

    return WillPopScope(
      child: Scaffold(
        appBar: AppBar(
          title: const Text('Choose your Services'),
          shape: const RoundedRectangleBorder(
            borderRadius: BorderRadius.vertical(
              bottom: Radius.circular(30),
            ),
          ),
          flexibleSpace: Container(
            decoration: const BoxDecoration(
              borderRadius: BorderRadius.only(
                bottomLeft: Radius.circular(20),
                bottomRight: Radius.circular(20),
              ),
              gradient: LinearGradient(
                colors: [Color.fromARGB(255, 240, 34, 19), Colors.blue],
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
              ),
            ),
          ),
        ),
        body: ListView(
          children: <Widget>[
            SwitchListTile(
                title: const Text(
                  'Weather',
                  style: TextStyle(
                    fontSize: 16,
                  ),
                ),
                value: weatherState,
                onChanged: (value) {
                  setState(() {
                    global.weatherState = value;
                  });
                  global.userData['subscriptions'][0]['state'] =
                      global.weatherState;
                  Dio dio = Dio();
                  dio.put(global.url + "/api/user/" + global.userData['id'],
                      data: {
                        "subscriptions": global.userData['subscriptions']
                      });

                  // print(global.userData['id']);

                  // global.userData['subscriptions'][0]['state'] = global.weatherState.toString();
                  // sendNewState(global.url + "/api/user/" + global.userData['subscriptions'][0]['state']);
                },
                activeTrackColor: Colors.blueAccent,
                activeColor: Colors.blue),
            SwitchListTile(
                title: const Text(
                  'Unsplash',
                  style: TextStyle(
                    fontSize: 16,
                  ),
                ),
                value: unsplashState,
                onChanged: (value) {
                  setState(() {
                    global.unsplashState = value;
                  });
                  global.userData['subscriptions'][1]['state'] =
                      global.unsplashState;
                  Dio dio = Dio();
                  dio.put(global.url + "/api/user/" + global.userData['id'],
                      data: {
                        "subscriptions": global.userData['subscriptions']
                      });
                },
                activeTrackColor: Colors.blueAccent,
                activeColor: Colors.blue),
            ListTile(
              title: const Text(
                'Github',
                style: TextStyle(
                  fontSize: 16,
                ),
              ),
              subtitle: const Text(
                'Access Token of a Github profile is require',
                style: TextStyle(
                  fontSize: 13,
                ),
              ),
              trailing: IconButton(
                icon: const Icon(Icons.check_box_outline_blank),
                onPressed: () {
                  alertDialog(context);
                  // print("done");
                },
              ),
              // value: githubState,
              // onChanged: (value) {
              //   setState(() {
              //     global.githubState = value;
              //   });
              //   global.userData['subscriptions'][2]['state'] =
              //       global.githubState;
              //   Dio dio = Dio();
              //   dio.put(global.url + "/api/user/" + global.userData['id'],
              //       data: {
              //         "subscriptions": global.userData['subscriptions']
              //       });
              // },
              // activeTrackColor: Colors.blueAccent,
              // activeColor: Colors.blue),
            ),
            SwitchListTile(
                title: const Text(
                  'Anime',
                  style: TextStyle(
                    fontSize: 16,
                  ),
                ),
                value: animeState,
                onChanged: (value) {
                  setState(() {
                    global.animeState = value;
                  });
                  global.userData['subscriptions'][3]['state'] =
                      global.animeState;
                  Dio dio = Dio();
                  dio.put(global.url + "/api/user/" + global.userData['id'],
                      data: {
                        "subscriptions": global.userData['subscriptions']
                      });
                },
                activeTrackColor: Colors.blueAccent,
                activeColor: Colors.blue),
            SwitchListTile(
                title: const Text(
                  'Twitter',
                  style: TextStyle(
                    fontSize: 16,
                  ),
                ),
                value: twitterState,
                onChanged: (value) {
                  setState(() {
                    global.twitterState = value;
                  });
                  global.userData['subscriptions'][4]['state'] =
                      global.twitterState;
                  Dio dio = Dio();
                  dio.put(global.url + "/api/user/" + global.userData['id'],
                      data: {
                        "subscriptions": global.userData['subscriptions']
                      });
                },
                activeTrackColor: Colors.blueAccent,
                activeColor: Colors.blue),
            SwitchListTile(
                title: const Text(
                  'Crypto',
                  style: TextStyle(
                    fontSize: 16,
                  ),
                ),
                value: cryptoState,
                onChanged: (value) {
                  setState(() {
                    global.cryptoState = value;
                  });
                  global.userData['subscriptions'][5]['state'] =
                      global.cryptoState;
                  Dio dio = Dio();
                  dio.put(global.url + "/api/user/" + global.userData['id'],
                      data: {
                        "subscriptions": global.userData['subscriptions']
                      });
                },
                activeTrackColor: Colors.blueAccent,
                activeColor: Colors.blue),
            SwitchListTile(
                title: const Text(
                  'Covid',
                  style: TextStyle(
                    fontSize: 16,
                  ),
                ),
                value: covidState,
                onChanged: (value) {
                  setState(() {
                    global.covidState = value;
                  });
                  global.userData['subscriptions'][6]['state'] =
                      global.covidState;
                  Dio dio = Dio();
                  dio.put(global.url + "/api/user/" + global.userData['id'],
                      data: {
                        "subscriptions": global.userData['subscriptions']
                      });
                },
                activeTrackColor: Colors.blueAccent,
                activeColor: Colors.blue),
            SwitchListTile(
                title: const Text(
                  'E-sport',
                  style: TextStyle(
                    fontSize: 16,
                  ),
                ),
                value: esportState,
                onChanged: (value) {
                  setState(() {
                    global.esportState = value;
                  });
                  global.userData['subscriptions'][6]['state'] =
                      global.esportState;
                  Dio dio = Dio();
                  dio.put(global.url + "/api/user/" + global.userData['id'],
                      data: {
                        "subscriptions": global.userData['subscriptions']
                      });
                },
                activeTrackColor: Colors.blueAccent,
                activeColor: Colors.blue),
            SwitchListTile(
              title: const Text(
                'Football',
                style: TextStyle(
                  fontSize: 16,
                ),
              ),
              value: footballState,
              onChanged: (value) {
                setState(() {
                  global.footballState = value;
                });
                global.userData['subscriptions'][6]['state'] =
                    global.footballState;
                Dio dio = Dio();
                dio.put(global.url + "/api/user/" + global.userData['id'],
                    data: {"subscriptions": global.userData['subscriptions']});
              },
              activeTrackColor: Colors.blueAccent,
              activeColor: Colors.blue,
            ),
            const SizedBox(
              height: 50,
            ),
            Padding(
              padding: const EdgeInsets.only(left: 40, right: 40),
              child: ElevatedButton(
                onPressed: () {
                  Navigator.pushNamedAndRemoveUntil(
                      context, '/dashboard', (route) => false);
                },
                child: const Text("Save"),
              ),
            ),
          ],
        ),
      ),
      onWillPop: () {
        Navigator.pushNamedAndRemoveUntil(
            context, '/dashboard', (route) => false);
        throw StateError("");
      },
    );
  }
}

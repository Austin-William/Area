// ignore_for_file: must_be_immutable

import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:dio/dio.dart';
import 'package:area/global/variables.dart' as global;

class DetailWidget extends StatefulWidget {
  DetailWidget(
      {Key? key,
      required this.widgetData,
      required this.userData,
      required this.serviceName})
      : super(key: key);

  dynamic widgetData;
  dynamic userData;
  dynamic serviceName;

  @override
  DetailWidgetState createState() => DetailWidgetState();
}

class DetailWidgetState extends State<DetailWidget> {
  String errorMessage = "";
  String action = "";
  String actionInput = "";
  String reaction = "";

  submitActionReaction() async {
    try {
      Dio dio = Dio();
      if (kDebugMode) {
        print("Processing...");
      }
      if (action != "" || actionInput != "" && reaction != "") {
        if (actionInput != "") {
          var newActionReactionInput = widget.userData['actionsreactions'];
          var nextActionReactionInput = {
            "action": action,
            "reaction": reaction,
            "actionInput": actionInput,
            "response": "none",
          };
          if (kDebugMode) {
            print("Action : " + action);
            print("Reaction : " + reaction);
            print("Action Input : " + actionInput);
            print('New Action Reaction Input : ' +
                newActionReactionInput.toString());
            print('Next Action Reaction Input : ' +
                nextActionReactionInput.toString());
          }
          if (newActionReactionInput == null) {
            newActionReactionInput = [nextActionReactionInput];
          } else {
            newActionReactionInput.add(nextActionReactionInput);
          }
          dynamic response = await dio.put(
            global.url + '/api/user/' + widget.userData['id'],
            data: {
              'actionsreactions': newActionReactionInput,
            },
          );
          if (response.statusCode == 200) {
            if (kDebugMode) {
              print("Successfully updated user data");
            }
            setState(() {
              errorMessage = "";
            });
          } else {
            if (kDebugMode) {
              print("Failed to update user data");
            }
            setState(() {
              errorMessage = "Failed to update user data";
            });
          }
        } else {
          var newActionReaction = widget.userData['actionsreactions'];
          var nextActionReaction = {
            "action": action,
            "reaction": reaction,
            "response": "none",
          };
          if (kDebugMode) {
            print("Action : " + action);
            print("Reaction : " + reaction);
          }
          if (newActionReaction == null) {
            newActionReaction = [nextActionReaction];
          } else {
            newActionReaction.add(nextActionReaction);
          }
          dynamic response = await dio.put(
            global.url + '/api/user/' + widget.userData['id'],
            data: {
              'actionsreactions': newActionReaction,
            },
          );
          if (response.statusCode == 200) {
            if (kDebugMode) {
              print("Successfully updated user data");
            }
            setState(() {
              errorMessage = "";
            });
          } else {
            if (kDebugMode) {
              print("Failed to update user data");
            }
            setState(() {
              errorMessage = "Failed to update user data";
            });
          }
        }
      }
      action = "";
      actionInput = "";
      reaction = "";
    } catch (e) {
      if (kDebugMode) {
        print(e);
      }
    }
  }

  sendActionRequest(String url) async {
    Dio dio = Dio();
    if (kDebugMode) {
      print(url);
    }
    await dio.post(url).then(
      (response) {
        if (kDebugMode) {
          print(response.data);
        }
      },
    );
  }

  sendReactionRequest(String url) async {
    Dio dio = Dio();
    if (kDebugMode) {
      print(url);
    }
    await dio.post(url).then(
      (response) {
        if (kDebugMode) {
          print(response.data);
        }
      },
    );
  }

  Widget userInputActionReaction(
      bool type, String title, String link, int i, String id) {
    if (type == true) {
      if (widget.widgetData['widgets'][0]['actions'][i]['input'] != null) {
        TextEditingController controller = TextEditingController();
        return Padding(
          padding: const EdgeInsets.symmetric(horizontal: 10.0, vertical: 5.0),
          child: Container(
            margin: const EdgeInsets.only(top: 10),
            child: TextField(
              controller: controller,
              decoration: InputDecoration(
                hintText: widget.widgetData['widgets'][0]['actions'][i]
                    ['placeholder'],
              ),
              onSubmitted: (value) {
                setState(() {
                  actionInput = value;
                });
                sendActionRequest(global.url + link + value);
              },
            ),
          ),
        );
      } else {
        return Padding(
          padding: const EdgeInsets.symmetric(horizontal: 20.0, vertical: 5.0),
          child: Container(
            decoration: const BoxDecoration(
              borderRadius: BorderRadius.all(Radius.circular(30.0)),
              gradient: LinearGradient(
                colors: [Color.fromARGB(255, 175, 175, 175), Colors.white],
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
              ),
            ),
            child: ElevatedButton(
              style: ElevatedButton.styleFrom(
                primary: Colors.transparent,
                shadowColor: Colors.transparent,
                elevation: 0,
              ),
              child: Text(
                widget.widgetData['widgets'][0]['actions'][i]['name'],
                textAlign: TextAlign.center,
                style: const TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.bold,
                ),
              ),
              onPressed: () {
                setState(() {
                  action =
                      widget.widgetData['widgets'][0]['actions'][i]['name'];
                });
                sendActionRequest(global.url + link);
              },
            ),
          ),
        );
      }
    } else if (type == false) {
      return Padding(
        padding: const EdgeInsets.symmetric(horizontal: 20.0, vertical: 5.0),
        child: Container(
          decoration: const BoxDecoration(
            borderRadius: BorderRadius.all(Radius.circular(30.0)),
            gradient: LinearGradient(
              colors: [Colors.white, Color.fromARGB(255, 175, 175, 175)],
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
            ),
          ),
          child: ElevatedButton(
            style: ElevatedButton.styleFrom(
              primary: Colors.transparent,
              shadowColor: Colors.transparent,
              elevation: 0,
            ),
            child: Text(
              title,
              textAlign: TextAlign.center,
              style: const TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.bold,
              ),
            ),
            onPressed: () {
              setState(() {
                reaction = id;
              });
              sendReactionRequest(global.url + link + id);
            },
          ),
        ),
      );
    }
    throw Exception("Reaction type not found");
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.serviceName),
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
        systemOverlayStyle: const SystemUiOverlayStyle(
          statusBarColor: Colors.transparent,
          statusBarIconBrightness: Brightness.light,
          statusBarBrightness: Brightness.dark,
        ),
        backgroundColor: Colors.transparent,
        shadowColor: Colors.transparent,
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          submitActionReaction();
        },
        child: const Icon(Icons.save),
      ),
      body: ListView(
        shrinkWrap: true,
        children: [
          Container(
            margin: const EdgeInsets.only(top: 10, bottom: 10),
            child: const Text(
              "Choose your action/reaction",
              textAlign: TextAlign.center,
              style: TextStyle(
                fontSize: 20,
              ),
            ),
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              SizedBox(
                width: MediaQuery.of(context).size.width * 0.5,
                height: MediaQuery.of(context).size.height * 0.75,
                child: ListView(
                  shrinkWrap: true,
                  children: [
                    for (var i = 0;
                        i < widget.widgetData['widgets'][0]['actions'].length;
                        i++) ...[
                      Text(
                        widget.widgetData['widgets'][0]['actions'][i]['name'],
                        style: const TextStyle(
                          fontWeight: FontWeight.bold,
                          fontSize: 15,
                        ),
                      ),
                      userInputActionReaction(
                        true,
                        widget.widgetData['widgets'][0]['actions'][i]['name'],
                        widget.widgetData['widgets'][0]['actions'][i]['link'],
                        i,
                        "none",
                      ),
                    ],
                  ],
                ),
              ),
              SizedBox(
                width: MediaQuery.of(context).size.width * 0.5,
                height: MediaQuery.of(context).size.height * 0.75,
                child: ListView(
                  children: [
                    for (var i = 0;
                        i < widget.widgetData['widgets'][0]['reactions'].length;
                        i++) ...[
                      Text(
                        widget.widgetData['widgets'][0]['reactions'][i]['name'],
                        style: const TextStyle(
                          fontWeight: FontWeight.bold,
                          fontSize: 15,
                        ),
                      ),
                      userInputActionReaction(
                        false,
                        widget.widgetData['widgets'][0]['reactions'][i]['name'],
                        widget.widgetData['widgets'][0]['reactions'][i]['link'],
                        i,
                        widget.widgetData['widgets'][0]['reactions'][i]['id'],
                      ),
                    ],
                  ],
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}

import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:dio/dio.dart';
import 'package:area/global/variables.dart' as global;

class ActionsReactions extends StatefulWidget {
  const ActionsReactions({Key? key}) : super(key: key);

  @override
  ActionsReactionsState createState() => ActionsReactionsState();
}

class ActionsReactionsState extends State<ActionsReactions> {
  @override
  Widget build(BuildContext context) {
    dynamic list;
    dynamic userData;
    Dio dio = Dio();

    fetchActionsReactions() async {
      try {
        var response = await dio.get(global.url + '/api/user/' + global.email);
        list = response.data['actionsreactions'];
        userData = response.data;
        if (kDebugMode) {
          print('=== RESPONSE ===');
          print(response);
          print('=== LIST ===');
          print(list);
        }
        return list;
      } catch (e) {
        if (kDebugMode) {
          print(e);
        }
      }
    }

    removeActionsReactions(int index) async {
      try {
        dynamic newList = list;
        if (kDebugMode) {
          print(newList);
        }
        newList.removeAt(index);
        await dio.put(global.url + '/api/user/' + userData['id'], data: {
          'actionsreactions': newList,
        });
      } catch (e) {
        if (kDebugMode) {
          print(e);
        }
      }
    }

    return Scaffold(
      appBar: AppBar(
        title: const Text('Actions & Reactions'),
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
          setState(() {
            fetchActionsReactions();
          });
        },
        child: const Icon(Icons.refresh),
        backgroundColor: Colors.blue,
      ),
      body: FutureBuilder(
        future: fetchActionsReactions(),
        builder: (context, snapshot) {
          if (snapshot.hasData && list != null && list.length > 0) {
            return ListView.builder(
              itemCount: list.length,
              itemBuilder: (context, index) {
                return Container(
                  margin: const EdgeInsets.all(10),
                  padding: const EdgeInsets.all(3),
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(10),
                  ),
                  height: 100,
                  child: Card(
                    elevation: 2,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(10),
                    ),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Padding(
                          padding: const EdgeInsets.all(8.0),
                          child: Text(
                            (index + 1).toString(),
                            style: const TextStyle(
                              fontSize: 20,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ),
                        const SizedBox(
                          width: 20,
                        ),
                        Column(
                          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: <Widget>[
                            Text(
                              "Action : " + list[index]['action'],
                              style: const TextStyle(
                                fontSize: 16,
                              ),
                            ),
                            if (list[index]['actionInput'] != null) ...[
                              Text(
                                "Action Input : " + list[index]['actionInput'],
                                style: const TextStyle(
                                  fontSize: 16,
                                ),
                              ),
                            ],
                            Text(
                              "Reaction : " + list[index]['reaction'],
                              style: const TextStyle(
                                fontSize: 16,
                              ),
                            ),
                          ],
                        ),
                        IconButton(
                          onPressed: () {
                            removeActionsReactions(index);
                          },
                          icon: const Icon(Icons.delete),
                        ),
                      ],
                    ),
                  ),
                );
              },
            );
          } else if (list == null) {
            return const Center(
              child: CircularProgressIndicator(),
            );
          } else {
            return const Center(
              child: Text(
                "No actions and reactions found",
                style: TextStyle(
                  fontSize: 20,
                  fontStyle: FontStyle.italic,
                ),
              ),
            );
          }
        },
      ),
    );
  }
}

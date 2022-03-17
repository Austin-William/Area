import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:dio/dio.dart';
import 'package:area/global/variables.dart' as global;

class Notifications extends StatefulWidget {
  const Notifications({Key? key}) : super(key: key);

  @override
  NotificationsState createState() => NotificationsState();
}

class NotificationsState extends State<Notifications> {
  dynamic notifications;

  fetchNotification() async {
    try {
      Dio dio = Dio();
      notifications = await dio.get(global.url + '/api/user/' + global.email);
      if (kDebugMode) {
        print(
            "Notifications: " + notifications.data['notifications'].toString());
      }
      return notifications.data;
    } catch (e) {
      if (kDebugMode) {
        print(e);
        rethrow;
      }
    }
  }

  String getNotifTitle(snapshot, index) {
    String str = snapshot.data['notifications'][index];
    var split = str.split(':');
    if (split[0].compareTo('https') == 0) {
      return '';
    }
    return (split[0] + ':');
  }

  String getNotifSubtitle(snapshot, index) {
    String res = "";
    String str = snapshot.data['notifications'][index];
    var split = str.split(':');
    if (split[0].compareTo('https') == 0) {
      res = res + 'https';
    }
    for (int i = 1; i != split.length; ++i) {
      res = res + split[i];
    }
    return (res);
  }

  removeNotification(int index) async {
    try {
      Dio dio = Dio();
      dynamic listNotif;
      listNotif = notifications.data['notifications'];
      listNotif.removeAt(index);
      await dio
          .put(global.url + '/api/user/' + notifications.data['id'], data: {
        'notifications': listNotif,
      });
    } catch (e) {
      if (kDebugMode) {
        print(e);
      }
    }
  }

  FutureBuilder displayNotification() {
    return (FutureBuilder(
      future: fetchNotification(),
      builder: (BuildContext context, AsyncSnapshot<dynamic> snapshot) {
        if (snapshot.hasData &&
            snapshot.data != null &&
            snapshot.data['notifications'].length > 0) {
          return ListView.builder(
            itemCount: snapshot.data['notifications'].length,
            itemBuilder: (context, index) {
              return Card(
                shape: const RoundedRectangleBorder(
                  borderRadius: BorderRadius.all(Radius.circular(15.0)),
                ),
                child: ListTile(
                  title: Text(getNotifTitle(snapshot, index),
                      style: const TextStyle(
                        fontWeight: FontWeight.bold,
                      )),
                  subtitle: Text(
                    getNotifSubtitle(snapshot, index),
                  ),
                  trailing: IconButton(
                    icon: const Icon(Icons.delete),
                    onPressed: () {
                      removeNotification(index);
                    },
                  ),
                ),
              );
            },
          );
        } else if (snapshot.data == null) {
          return const Center(
            child: CircularProgressIndicator(),
          );
        } else {
          return const Center(
            child: Text(
              'No notifications',
              style: TextStyle(
                fontSize: 20,
                fontStyle: FontStyle.italic,
              ),
            ),
          );
        }
      },
    ));
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Notifications'),
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
          fetchNotification();
        },
        child: const Icon(Icons.refresh),
      ),
      body: displayNotification(),
    );
  }
}
